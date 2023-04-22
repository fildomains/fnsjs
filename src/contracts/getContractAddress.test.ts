import { ContractName, SupportedNetworkId } from './types'
import { getContractAddress } from './getContractAddress'

const hardhatAddress = {
  Registry: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  ReverseRegistrar: '0x8464135c8F25Da09e49BC8782676a84730C318bC',
  Root: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  BaseRegistrarImplementation: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  DummyOracle: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  ExponentialPremiumPriceOracle: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  StaticMetadataService: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  NameWrapper: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  RegistrarController: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
  FNSToken: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
  Sunday: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  Receiver: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
  PublicResolver: '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
  BulkRenewal: '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1',
  RSASHA1Algorithm: '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
  RSASHA256Algorithm: '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
  P256SHA256Algorithm: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
  DummyAlgorithm: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
  SHA1Digest: '0x59b670e9fA9D0A427751Af201D676719a970857b',
  SHA256Digest: '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
  DummyDigest: '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44',
  DNSSECImpl: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
  OffchainDNSResolver: '0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9',
  TLDPublicSuffixList: '0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8',
  DNSRegistrar: '0x851356ae760d987E095750cCeb3bC6014560891C',
  UniversalResolver: '0xf5059a5D33d5853360D16C683c16e67980206f36',
  Multicall: '0x95401dc811bb5740090279Ba06cfA8fcF6113778',
  TestRegistrar: '0x59F2f1fCfE2474fD5F0b9BA1E73ca90b143Eb8d0',
  TestUnwrap: '0x998abeb3E57409262aE5b751f60747921B33613E',
}

const hyperspaceAddress = {
  BaseRegistrarImplementation: '0x495afaC4f4272f7c747D6910e74430584Ef1f50A',
  BulkRenewal: '0x87ea3C218447E2Aecde3A3f72746EB5856CC0E0f',
  DNSRegistrar: '0xc46fFfcD824d87964C984c382c1EA077cBCAD025',
  DNSSECImpl: '0xd145C2A6fA446dc2345b6e56D1362b6178449F2e',
  DummyAlgorithm: '0x9bFdFf147E855EABc256F6Ff789ef044F21178D8',
  DummyDigest: '0x350509B731aEcBEa776599027659BC06c0A5EDE9',
  DummyOracle: '0x97cA658672F1aF9F5b777C2737A97b3F06E1484A',
  ExponentialPremiumPriceOracle: '0x887195b902A16eF6B5884b101F0682D73A19d774',
  FNSToken: '0x8177dE00494d4757Ba1D954d189F60DF42A12FEe',
  Multicall: '0x1F88275edD949c5e1662bF0428e719697e49EBdb',
  NameWrapper: '0x46b7a579eDa54bdF1D2739F439C21EE889633020',
  OffchainDNSResolver: '0x4e664Fb2410CD1A3D74105dB40d81D8a399187CB',
  P256SHA256Algorithm: '0xABE3d3e46886Ac3a28D6F3d201986B469cfc1744',
  PublicResolver: '0xD75719E7Ca2DdDd663911F7d667Bf0f1ac54BF1e',
  RSASHA1Algorithm: '0x562a982b9B0cBFbD032478db6242f35012B70002',
  RSASHA256Algorithm: '0x8981C52FfC7583102493553d53f34d7eA715E921',
  Receiver: '0x118Ee6452E20cF0CC672ef0765d284c92EeF0949',
  RegistrarController: '0x8048B2095eD8111536dF23aE18BbF6696cC20512',
  Registry: '0x0000000000Ec577Ad90e99CA7817e976e953C3bd',
  ReverseRegistrar: '0x750b389d847b1bDA0a0b846eA47eF4D3BE3837f2',
  Root: '0x80348246B46372873baF8ba8Eb8f6eD9D10F5407',
  SHA1Digest: '0x791A537d29e6774677f744e55C0eE3EED5921546',
  SHA256Digest: '0x2b5Df9d8dBfb5399751d01E867c026BBf6B5fFF8',
  StaticMetadataService: '0x71c46fD73096acf8344E3442cc19bf8c27F74c40',
  Sunday: '0x0c1F64b3F4EEa808dF059a93498aea80F58DDCe2',
  TLDPublicSuffixList: '0xeb25bc4CeFAc9f4C21E5f763d7c41290D00Caf56',
  TestRegistrar: '0xa3EbDa67C33d311078Cf6eD59BF944A3610fb873',
  UniversalResolver: '0x75e34A6A1E3C9cb4dD015e4EbBF5609A9cfaCf54',
  TestUnwrap: '0xa64be5d0929e1d672a4f65ab22751dbb09602d98',
}

const filecoinAddress = {
  BaseRegistrarImplementation: '0x495afaC4f4272f7c747D6910e74430584Ef1f50A',
  BulkRenewal: '0x562a982b9B0cBFbD032478db6242f35012B70002',
  DNSRegistrar: '0xA64be5D0929E1d672A4F65AB22751DBB09602D98',
  DNSSECImpl: '0x350509B731aEcBEa776599027659BC06c0A5EDE9',
  DummyOracle: '0xE1D412ECd7B9d9E4187E28db97B5f2d466160686',
  ExponentialPremiumPriceOracle: '0xdD45E8d5eAec21A37b751CDcF745B25554006638',
  FNSToken: '0xC5513902F3a47E7F102d81f2A53Fd233a518B5F9',
  Multicall: '0x0B6D3B28A5bF49B8591aaca085d494088c88309f',
  NameWrapper: '0x46b7a579eDa54bdF1D2739F439C21EE889633020',
  OffchainDNSResolver: '0x75e34A6A1E3C9cb4dD015e4EbBF5609A9cfaCf54',
  P256SHA256Algorithm: '0x9bFdFf147E855EABc256F6Ff789ef044F21178D8',
  PublicResolver: '0x28856841248E21e7650a81E4D35c846d268Bf239',
  RSASHA1Algorithm: '0x8981C52FfC7583102493553d53f34d7eA715E921',
  RSASHA256Algorithm: '0xABE3d3e46886Ac3a28D6F3d201986B469cfc1744',
  Receiver: '0x6aD54797f5d60ab2f6eDa702BC7c33367eC23aAc',
  RegistrarController: '0xfEa0e215CE247f5C433023f50E46c862b283809F',
  Registry: '0x0000000000Ec577Ad90e99CA7817e976e953C3bd',
  ReverseRegistrar: '0x750b389d847b1bDA0a0b846eA47eF4D3BE3837f2',
  Root: '0x80348246B46372873baF8ba8Eb8f6eD9D10F5407',
  SHA1Digest: '0x791a537d29e6774677f744e55c0ee3eed5921546',
  SHA256Digest: '0x2b5Df9d8dBfb5399751d01E867c026BBf6B5fFF8',
  StaticMetadataService: '0x71c46fD73096acf8344E3442cc19bf8c27F74c40',
  Sunday: '0x9B0D73f77b18Fd0b4499a37e129666E5f5130191',
  TLDPublicSuffixList: '0x1F88275edD949c5e1662bF0428e719697e49EBdb',
  UniversalResolver: '0x6fA110b1c451373C26D1B680A48b135A860D63df',
}

const calibrationAddress = {
  BaseRegistrarImplementation: '0x495afaC4f4272f7c747D6910e74430584Ef1f50A',
  BulkRenewal: '0x87ea3C218447E2Aecde3A3f72746EB5856CC0E0f',
  DNSRegistrar: '0xc46fFfcD824d87964C984c382c1EA077cBCAD025',
  DNSSECImpl: '0xd145C2A6fA446dc2345b6e56D1362b6178449F2e',
  DummyAlgorithm: '0x9bFdFf147E855EABc256F6Ff789ef044F21178D8',
  DummyDigest: '0x350509B731aEcBEa776599027659BC06c0A5EDE9',
  DummyOracle: '0x97cA658672F1aF9F5b777C2737A97b3F06E1484A',
  ExponentialPremiumPriceOracle: '0x887195b902A16eF6B5884b101F0682D73A19d774',
  FNSToken: '0x8177dE00494d4757Ba1D954d189F60DF42A12FEe',
  Multicall: '0x1F88275edD949c5e1662bF0428e719697e49EBdb',
  NameWrapper: '0x46b7a579eDa54bdF1D2739F439C21EE889633020',
  OffchainDNSResolver: '0x4e664Fb2410CD1A3D74105dB40d81D8a399187CB',
  P256SHA256Algorithm: '0xABE3d3e46886Ac3a28D6F3d201986B469cfc1744',
  PublicResolver: '0xD75719E7Ca2DdDd663911F7d667Bf0f1ac54BF1e',
  RSASHA1Algorithm: '0x562a982b9B0cBFbD032478db6242f35012B70002',
  RSASHA256Algorithm: '0x8981C52FfC7583102493553d53f34d7eA715E921',
  Receiver: '0x118Ee6452E20cF0CC672ef0765d284c92EeF0949',
  RegistrarController: '0x8048B2095eD8111536dF23aE18BbF6696cC20512',
  Registry: '0x0000000000Ec577Ad90e99CA7817e976e953C3bd',
  ReverseRegistrar: '0x750b389d847b1bDA0a0b846eA47eF4D3BE3837f2',
  Root: '0x80348246B46372873baF8ba8Eb8f6eD9D10F5407',
  SHA1Digest: '0x791A537d29e6774677f744e55C0eE3EED5921546',
  SHA256Digest: '0x2b5Df9d8dBfb5399751d01E867c026BBf6B5fFF8',
  StaticMetadataService: '0x71c46fD73096acf8344E3442cc19bf8c27F74c40',
  Sunday: '0x0c1F64b3F4EEa808dF059a93498aea80F58DDCe2',
  TLDPublicSuffixList: '0xeb25bc4CeFAc9f4C21E5f763d7c41290D00Caf56',
  TestRegistrar: '0xa3EbDa67C33d311078Cf6eD59BF944A3610fb873',
  UniversalResolver: '0x75e34A6A1E3C9cb4dD015e4EbBF5609A9cfaCf54',
  TestUnwrap: '0xa64be5d0929e1d672a4f65ab22751dbb09602d98',
}

function testAddress(addresses: any, networkId: SupportedNetworkId) {
  for (const name of Object.keys(addresses)) {
    if (
      [
        'DummyAlgorithm',
        'DummyDigest',
        'DummyOracle',
        'ExponentialPremiumPriceOracle',
        'TestUnwrap',
      ].includes(name)
    ) {
      // eslint-disable-next-line no-continue
      continue
    }

    expect(getContractAddress(networkId)(name as ContractName)).toEqual(
      addresses[name],
    )
  }
}

describe('getContractAddress', () => {
  it('get contract address of the network 314', async () => {
    testAddress(filecoinAddress, '314')
  })

  it('get contract address of the network 3141', async () => {
    testAddress(hyperspaceAddress, '3141')
  })

  it('get contract address of the network 314159', async () => {
    testAddress(calibrationAddress, '314159')
  })

  it('get contract address of the network 1337', async () => {
    testAddress(hardhatAddress, '1337')
  })

  it('get contract address of the network 31337', async () => {
    testAddress(hardhatAddress, '31337')
  })
})
