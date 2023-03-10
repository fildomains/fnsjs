import { FNS } from '..'
import setup, { deploymentAddresses } from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getResolver', () => {
  it('should find the resolver for a name with a resolver', async () => {
    const result = await fnsInstance.getResolver('with-profile.fil')
    expect(result).toBe(deploymentAddresses.LegacyPublicResolver)
  })
})
