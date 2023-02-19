import dotenv from 'dotenv'
import { FNS } from '..'
import setup from '../tests/setup'

dotenv.config()

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup(true))
})

jest.setTimeout(20000)

describe('getProfile', () => {
  it('should return a profile from a ccip-read name', async () => {
    const result = await fnsInstance.getProfile('with-profile.fil', {
      fallback: {
        texts: ['email', 'description'],
        contentHash: true,
        coinTypes: ['0', '60'],
      },
    })
    expect(result).toBeTruthy()
    if (result) {
      expect(result.address).toBe('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')
    }
  })
})
