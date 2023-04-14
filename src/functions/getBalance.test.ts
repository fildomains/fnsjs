import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getBalance', () => {
  it('should get fil balance', async () => {
    const result = await fnsInstance.getBalance(
      '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    )
    expect(result.toString()).toEqual('10000000000000000000000')
  })
})
