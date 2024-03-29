import dotenv from 'dotenv'
import { ethers } from 'ethers'
import { FNS } from '..'
import setup, { deploymentAddresses } from '../tests/setup'

dotenv.config()

let fnsInstance: FNS
let revert: Awaited<ReturnType<typeof setup>>['revert']
let provider: ethers.providers.JsonRpcProvider
let accounts: string[]

beforeAll(async () => {
  ;({ fnsInstance, revert, provider } = await setup())
  accounts = await provider.listAccounts()
})

beforeEach(async () => {
  await revert()
})

afterAll(async () => {
  await revert()
})

const checkRecords = (
  result: Record<string, any> | undefined,
  textLength = 3,
  coinTypeLength = 3,
) => {
  expect(result).toBeDefined()
  if (result) {
    expect(result.records?.texts).toHaveLength(textLength)
    expect(result.records?.coinTypes).toHaveLength(coinTypeLength)
    expect(result.resolverAddress).toBe(
      deploymentAddresses.LegacyPublicResolver,
    )
  }
}

jest.setTimeout(20000)

describe('getProfile', () => {
  describe('with an address', () => {
    it('should return a profile object with no other args', async () => {
      const result = await fnsInstance.getProfile(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      expect(result).toBeDefined()
      if (result) {
        expect((result as any).name).toBe('with-profile.fil')
        expect((result as any).address).toBeUndefined()
        checkRecords(result)
      }
    })
    it('should return a profile object with specified records', async () => {
      const result = await fnsInstance.getProfile(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        { texts: ['description', 'url'], coinTypes: ['ETC_LEGACY', '0'] },
      )
      expect(result).toBeDefined()
      if (result) {
        expect((result as any).name).toBe('with-profile.fil')
        expect((result as any).address).toBeUndefined()
        checkRecords(result, 2, 3)
      }
    })
    it('should return a profile object with all of each specified record type', async () => {
      const result = await fnsInstance.getProfile(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        { texts: true, coinTypes: true },
      )
      checkRecords(result)
    })
    it('should return null for an address without a name', async () => {
      const result = await fnsInstance.getProfile(
        '0x8e8db5ccef88cca9d624701db544989c996e3216',
      )
      expect(result).toBeUndefined()
    })
  })
  describe('with a name', () => {
    it('should return a profile object with no other args', async () => {
      const result = await fnsInstance.getProfile('with-profile.fil')
      expect((result as any).address).toBe(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      checkRecords(result)
    })
    it('should return a profile object with specified records', async () => {
      const result = await fnsInstance.getProfile('with-profile.fil', {
        texts: ['description', 'url'],
        coinTypes: ['ETC_LEGACY', '0'],
      })
      expect((result as any).address).toBe(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      checkRecords(result, 2, 3)
    })
    it('should return a profile object with all of each specified record type', async () => {
      const result = await fnsInstance.getProfile('with-profile.fil', {
        texts: true,
        coinTypes: true,
      })
      checkRecords(result)
    })
    it('should return a profile object for a specified resolver', async () => {
      const tx = await fnsInstance.wrapName('test123.fil', {
        wrappedOwner: accounts[1],
        addressOrIndex: 1,
      })
      await tx.wait()
      const result = await fnsInstance.getProfile('test123.fil', {
        resolverAddress: deploymentAddresses.LegacyPublicResolver,
      })
      expect(result).toBeDefined()
      expect(result?.address).toBe(accounts[1])
      expect(result?.resolverAddress).toBe(
        deploymentAddresses.LegacyPublicResolver,
      )
    })
    it('should return undefined for an unregistered name', async () => {
      const result = await fnsInstance.getProfile('test123123123cool.fil')
      expect(result).toBeUndefined()
    })
  })
  describe('with an old resolver', () => {
    it('should use fallback methods for a name with an older resolver (no multicall)', async () => {
      const result = await fnsInstance.getProfile('with-legacy-resolver.fil')
      expect(result).toBeDefined()
      if (result) {
        expect(result.address).toBe(
          '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        )
        expect(result.resolverAddress).toBe(
          deploymentAddresses.NoMulticallResolver,
        )
      }
    })
  })
  describe('with invalid resolver', () => {
    it('should fail gracefully for a name with invalid resolver', async () => {
      const tx = await fnsInstance.setResolver('test123.fil', {
        contract: 'registry',
        resolver: '0xb794F5eA0ba39494cE839613fffBA74279579268',
        addressOrIndex: 1,
      })
      expect(tx).toBeTruthy()
      await tx.wait()
      const result = await fnsInstance.getProfile('test123.fil')
      expect(result).toBeDefined()
      if (result) {
        expect(result.address).toBeUndefined()
        expect(Object.keys(result.records!).length).toBe(0)
        expect(result.resolverAddress).toBe(
          '0xb794F5eA0ba39494cE839613fffBA74279579268',
        )
        expect(result.isInvalidResolverAddress).toBe(true)
      }
    })

    it('should fail gracefully for a wrapped name with invalid resolver', async () => {
      const tx = await fnsInstance.setResolver('wrapped.fil', {
        contract: 'nameWrapper',
        resolver: '0xb794F5eA0ba39494cE839613fffBA74279579268',
        addressOrIndex: 1,
      })
      expect(tx).toBeTruthy()
      await tx.wait()
      const result = await fnsInstance.getProfile('wrapped.fil')
      expect(result).toBeDefined()
      if (result) {
        expect(result.address).toBeUndefined()
        expect(Object.keys(result.records!).length).toBe(0)
        expect(result.resolverAddress).toBe(
          '0xb794F5eA0ba39494cE839613fffBA74279579268',
        )
        expect(result.isInvalidResolverAddress).toBe(true)
      }
    })

    it('should fail gracefully for name with invalid resolver option', async () => {
      const result = await fnsInstance.getProfile('test123.fil', {
        resolverAddress: '0xb794F5eA0ba39494cE839613fffBA74279579268',
      })
      expect(result).toBeDefined()
      if (result) {
        expect(result.address).toBeFalsy()
        expect(Object.keys(result.records!).length).toBe(0)
        expect(result.resolverAddress).toBe(
          '0xb794F5eA0ba39494cE839613fffBA74279579268',
        )
      }
    })

    it('should fail gracefully for wrapped name with invalid resolver option', async () => {
      const result = await fnsInstance.getProfile('wrapped.fil', {
        resolverAddress: '0xb794F5eA0ba39494cE839613fffBA74279579268',
      })
      expect(result).toBeDefined()
      if (result) {
        expect(result.address).toBeFalsy()
        expect(Object.keys(result.records!).length).toBe(0)
        expect(result.resolverAddress).toBe(
          '0xb794F5eA0ba39494cE839613fffBA74279579268',
        )
      }
    })
  })
})
