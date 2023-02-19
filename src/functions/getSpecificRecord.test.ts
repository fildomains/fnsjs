import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS

beforeAll(async () => {
  ;({ fnsInstance } = await setup())
})

describe('getSpecificRecord', () => {
  describe('getContentHash', () => {
    it('should return null for a non-existent name', async () => {
      const result = await fnsInstance.getContentHash('test123123cool.fil')
      expect(result).toBeUndefined()
    })
    it('should return null for a name with no contenthash record', async () => {
      const result = await fnsInstance.getContentHash('with-profile.fil')
      expect(result).toBeUndefined()
    })
    it('should return the contenthash for a name with the record set', async () => {
      const result = await fnsInstance.getContentHash('with-contenthash.fil')
      expect(result).toMatchObject({
        protocolType: 'ipfs',
        decoded: 'bafybeico3uuyj3vphxpvbowchdwjlrlrh62awxscrnii7w7flu5z6fk77y',
        error: undefined,
      })
    })
  })

  describe('getText', () => {
    it('should return a record from a key', async () => {
      const result = await fnsInstance.getText(
        'with-profile.fil',
        'description',
      )
      expect(result).toBe('Hello2')
    })

    it('should return null for a non-existent key', async () => {
      const result = await fnsInstance.getText(
        'with-profile.fil',
        'thiskeydoesntexist',
      )
      expect(result).toBeUndefined()
    })
  })

  describe('getAddr', () => {
    it('should return the FIL addr record if no coinType is provided', async () => {
      const result = await fnsInstance.getAddr('with-profile.fil')
      expect(result).toBe('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')
    })
    it('should return the correct address based on a coin ID input as a number', async () => {
      const result = await fnsInstance.getAddr('with-profile.fil', 61)
      expect((result as any).addr).toBe(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      expect((result as any).coin).toBe('ETC_LEGACY')
    })
    it('should return the correct address based on a coin ID input as a string', async () => {
      const result = await fnsInstance.getAddr('with-profile.fil', '61')
      expect((result as any).addr).toBe(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      expect((result as any).coin).toBe('ETC_LEGACY')
    })
    it('should return the correct address based on a coin name', async () => {
      const result = await fnsInstance.getAddr('with-profile.fil', 'ETC_LEGACY')
      expect((result as any).addr).toBe(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      expect((result as any).coin).toBe('ETC_LEGACY')
    })
    it('should return null for a non-existent coin', async () => {
      const result = await fnsInstance.getAddr('with-profile.fil', 'BNB')
      expect(result).toBeUndefined()
    })
  })
})
