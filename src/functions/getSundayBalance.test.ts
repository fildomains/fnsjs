import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getSundayBalance', () => {
  it('should get sunday balance', async () => {
    expect(
      (
        await fnsInstance.getSundayBalance(
          '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        )
      ).toNumber(),
    ).toEqual(0)
  })
})
