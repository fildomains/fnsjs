import { ethers } from 'ethers'
import { FNS } from '..'
import setup from '../tests/setup'
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

describe('registerName', () => {
  beforeEach(async () => {
    await revert()
  })

  async function registerNameTest(name: string, useFns: boolean | undefined) {
    const duration = 31536000
    const { customData, ...commitPopTx } =
      await fnsInstance.commitName.populateTransaction(name, {
        duration,
        owner: accounts[1],
        addressOrIndex: accounts[1],
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
        owner: accounts[1],
        addressOrIndex: accounts[1],
        useFns: true,
      })
      await tx.wait()
    } else {
      const controller = await fnsInstance.contracts!.getRegistrarController()!
      const [price] = await controller.rentPrice(name, duration)

      const tx = await fnsInstance.registerName(name, {
        secret,
        duration,
        owner: accounts[1],
        addressOrIndex: accounts[1],
        value: price,
      })
      await tx.wait()
    }

    const nameWrapper = await fnsInstance.contracts!.getNameWrapper()!
    const owner = await nameWrapper.ownerOf(namehash(name))
    expect(owner).toBe(accounts[1])
  }

  // @ts-ignore
  it('should return a registration transaction and succeed', async () => {
    await registerNameTest('cccool-swag.fil', false)
    await registerNameTest('1-cccool-swag.fil', true)
  }, 5000)
})
