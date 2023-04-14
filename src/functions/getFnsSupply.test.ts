import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getFnsSupply', () => {
  it('should get fns supply', async () => {
    const result = await fnsInstance.getFnsSupply()
    expect(result.gt(0)).toEqual(true)
  })
})
