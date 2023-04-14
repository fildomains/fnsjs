import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getFnsBalance', () => {
  it('should get fns balance', async () => {
    const result = await fnsInstance.getFnsBalance(
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    )
    expect(result.gt(0)).toEqual(true)
  })
})
