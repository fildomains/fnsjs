import { FNS } from '..'
import setup from '../tests/setup'

let fnsInstance: FNS
let revert: Awaited<ReturnType<typeof setup>>['revert']

beforeAll(async () => {
  ;({ fnsInstance, revert } = await setup())
})

afterAll(async () => {
  await revert()
})

describe('supportsTLD', () => {
  it('should return true for .fil tld', async () => {
    const result = await fnsInstance.supportsTLD('fil')
    expect(result).toBeTruthy()
  })

  it('should return true for .xyz tld', async () => {
    const result = await fnsInstance.supportsTLD('xyz')
    expect(result).toBeTruthy()
  })

  it('should return false for .com tld', async () => {
    const result = await fnsInstance.supportsTLD('com')
    expect(result).toBeFalsy()
  })

  it('should return true for .fil name', async () => {
    const result = await fnsInstance.supportsTLD('test123.fil')
    expect(result).toBeTruthy()
  })

  it('should return true for .xyz name', async () => {
    const result = await fnsInstance.supportsTLD('test123.xyz')
    expect(result).toBeTruthy()
  })

  it('should return false for .com name', async () => {
    const result = await fnsInstance.supportsTLD('test123.com')
    expect(result).toBeFalsy()
  })
})
