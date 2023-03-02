import { ethers } from 'ethers'
import { FNS } from '..'
import setup from '../tests/setup'
import { getDay, getWeek, advanceTime } from '../utils/format'

let fnsInstance: FNS
let revert: Awaited<ReturnType<typeof setup>>['revert']
let provider: ethers.providers.JsonRpcProvider

beforeAll(async () => {
  ;({ fnsInstance, revert, provider } = await setup())
})

afterAll(async () => {
  await revert()
})

describe('getShare', () => {
  beforeEach(async () => {
    await revert()
  })

  it('should get the share for an address and week', async () => {
    let week = await getWeek(provider)
    const day = await getDay(provider)

    let result = await fnsInstance.getShare(week)

    expect(result).toEqual({
      fil: ethers.BigNumber.from('0'),
      fns: ethers.BigNumber.from('0'),
      inited: false,
    })

    // Saturday
    await advanceTime(provider, (6 - day) * 24 * 3600)

    await fnsInstance.initShare()

    week = await getWeek(provider)
    result = await fnsInstance.getShare(week)
    expect(result!.fil.toNumber()).toBeGreaterThanOrEqual(0)
    expect(result!.fns.toNumber()).toBeGreaterThanOrEqual(0)
    expect(result!.inited).toEqual(true)
  })
})
