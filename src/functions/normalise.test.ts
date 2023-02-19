import { namehash } from '../utils/normalise'

describe('normalise', () => {
  it('should namehash an empty string', () => {
    const hash = namehash('')
    expect(hash).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    )
  })
  it('should namehash a TLD', () => {
    const hash = namehash('fil')
    expect(hash).toEqual(
      '0x78f6b1389af563cc5c91f234ea46b055e49658d8b999eeb9e0baef7dbbc93fdb',
    )
  })
  it('should namehash a 2LD', () => {
    const hash = namehash('foo.fil')
    expect(hash).toEqual(
      '0xbae79aa33d674a496f9e0782c1a197bbac0d7a2dcccb8a7b67e76b72fe6eabcd',
    )
  })
})
