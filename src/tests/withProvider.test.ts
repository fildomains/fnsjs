import { ethers } from 'ethers'
import { FNS } from '..'
import setup from './setup'

let fnsInstance: FNS
let providerFake: ethers.providers.JsonRpcProvider

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
  providerFake = new ethers.providers.JsonRpcProvider(
    'http://localhost:34023',
    'ropsten',
  )
})

describe('withProvider', () => {
  it('should be able to use a new provider', async () => {
    const addr = await fnsInstance.getAddr('with-profile.fil')
    expect(addr).toBeTruthy()

    try {
      await fnsInstance.withProvider(providerFake).getOwner('with-profile.fil')
      expect(false).toBeTruthy()
    } catch {
      expect(true).toBeTruthy()
    }
  })
})
