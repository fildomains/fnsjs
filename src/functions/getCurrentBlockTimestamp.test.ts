import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getCurrentBlockTimestamp', () => {
  it('should get current block timestamp', async () => {
    const result = await fnsInstance.getCurrentBlockTimestamp()

    expect(result.gt(0)).toEqual(true)
  })
})
