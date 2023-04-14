import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getSundaySupply', () => {
  it('should get sunday supply', async () => {
    expect((await fnsInstance.getSundaySupply()).toNumber()).toEqual(0)
  })
})
