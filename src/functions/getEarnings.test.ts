import { ethers } from 'ethers'
import { FNS } from '..'
import setup from '../tests/setup'
import { getDay, getWeek, advanceTime } from '../utils/format'
import { namehash } from '../utils/normalise'

let fnsInstance: FNS
let revert: Awaited<ReturnType<typeof setup>>['revert']
let provider: ethers.providers.JsonRpcProvider
let accounts: string[]

beforeAll(async () => {
  ;({ fnsInstance, revert, provider } = await setup())
  accounts = await provider.listAccounts()
})

afterAll(async () => {
  await revert()
})

describe('getEarnings', () => {
  beforeEach(async () => {
    await revert()
  })

  async function registerNameTest(name: string, useFns: boolean | undefined) {
    const duration = 31536000
    const { customData, ...commitPopTx } =
      await fnsInstance.commitName.populateTransaction(name, {
        duration,
        owner: accounts[0],
        addressOrIndex: accounts[0],
      })
    const commitTx = await provider.getSigner().sendTransaction(commitPopTx)
    await commitTx.wait()

    await provider.send('evm_increaseTime', [60])
    await provider.send('evm_mine', [])

    const { secret } = customData!

    if (useFns === true) {
      const tx = await fnsInstance.registerName(name, {
        secret,
        duration,
        owner: accounts[0],
        addressOrIndex: accounts[0],
        useFns: true,
      })
      await tx.wait()
    } else {
      const controller = await fnsInstance.contracts!.getRegistrarController()!
      const [price] = await controller.rentPrice(name, duration)

      const tx = await fnsInstance.registerName(name, {
        secret,
        duration,
        owner: accounts[0],
        addressOrIndex: accounts[0],
        value: price,
      })
      await tx.wait()
    }

    const nameWrapper = await fnsInstance.contracts!.getNameWrapper()!
    const owner = await nameWrapper.ownerOf(namehash(name))
    expect(owner).toBe(accounts[0])
  }

  it('should get the earnings for an address and week', async () => {
    await provider.send('evm_mine', [])
    const day = await getDay(provider)

    await registerNameTest('fildomains.fil', false)

    let result = await fnsInstance.getEarnings(accounts[0], 0)
    expect(result).toEqual({
      fil: ethers.BigNumber.from('0'),
      fns: ethers.BigNumber.from('0'),
      inited: false,
    })

    // Sunday
    await advanceTime(provider, (7 - day) * 24 * 3600)
    expect(await fnsInstance.getSundayPaused()).toEqual(true)
    await fnsInstance.pledge(100)

    // Monday
    await advanceTime(provider, 24 * 3600)
    expect(await fnsInstance.getSundayPaused()).toEqual(false)
    await fnsInstance.claimEarnings(namehash('fildomains.fil'))

    result = await fnsInstance.getEarnings(accounts[0], 0)
    expect(result!.fil.gt(0)).toEqual(true)
    expect(result!.fns.gt(0)).toEqual(true)
    expect(result!.inited).toEqual(true)
    await expect(fnsInstance.pledge(100)).rejects.toThrow()
    await expect(fnsInstance.withdrawal(100)).rejects.toThrow()

    // Sunday
    await advanceTime(provider, 6 * 24 * 3600)
    expect(await fnsInstance.getSundayPaused()).toEqual(true)
    await fnsInstance.withdrawal(50)

    // Monday
    await advanceTime(provider, 24 * 3600)
    expect(await fnsInstance.getSundayPaused()).toEqual(false)
    await fnsInstance.claimEarnings(namehash('fildomains.fil'))

    result = await fnsInstance.getEarnings(accounts[0], 0)
    expect(result!.fil.gt(0)).toEqual(true)
    expect(result!.fns.gt(0)).toEqual(true)
    expect(result!.inited).toEqual(true)
  })
})
