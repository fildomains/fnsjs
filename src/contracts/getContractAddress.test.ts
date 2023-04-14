import { ContractName } from './types'
import { getContractAddress } from './getContractAddress'
import { SupportedNetworkId } from '../../dist/types/contracts/types'

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
  TestRegistrar: '0x59F2f1fCfE2474fD5F0b9BA1E73ca90b143Eb8d0',
  UniversalResolver: '0xf5059a5D33d5853360D16C683c16e67980206f36',
  Multicall: '0x95401dc811bb5740090279Ba06cfA8fcF6113778',
  TestUnwrap: '0x998abeb3E57409262aE5b751f60747921B33613E',
}

const hyperspaceAddress = {
  BaseRegistrarImplementation: '0x35EaA0969F566D0B58d10A5E4B9E860a1ffF1a71',
  BulkRenewal: '0xc38659eba620007672010a1d44e02f5a3850979f',
  DNSRegistrar: '0xB4650aC5CDE7c2B3971E509894acbA05d6fBB02D',
  DNSSECImpl: '0x3Efef9249d9d8E4558f08F661D4F2D9a35F006c5',
  DummyAlgorithm: '0x887f0eA186e2774Bcaa9757aE154f22200c92768',
  DummyDigest: '0x55fF342b6c1837Eaff4050A3a45f79932FA16782',
  DummyOracle: '0x17c637b6dd15A6c0686Cf8aD035ac49636E59a06',
  ExponentialPremiumPriceOracle: '0x1E8598928a810D859C92bEffAA7cb7b964c66258',
  FNSToken: '0x9E2a0305E33b8BeCb7fD0fcFaCe4a99B670E7999',
  Multicall: '0xd255813cf75b53d489BF5979B2961Ad535A797BE',
  NameWrapper: '0x2e8485829bB7f5b775ab7D54C2D9aa6C02da1eE2',
  OffchainDNSResolver: '0x0eE0F5ff2522d504a078d9c54b8C1976E7A1101d',
  P256SHA256Algorithm: '0x949E040ad78C5c69602bAc14E291Fe249350E09E',
  PublicResolver: '0x86bdC76cee571e8A5E5060971499e4Fd620Ff6D4',
  RSASHA1Algorithm: '0x1b652d9A8e06155d6f7cC0ff6bCa68E214aE7828',
  RSASHA256Algorithm: '0xf9e2bFc6dF96dA596b2F0c0ed978Aad790Ab9Df1',
  Receiver: '0xd749D520Fa6D77c66E32aC446E2141ABfa71529C',
  RegistrarController: '0x3D8507D53981E149DB4C604C91E93A63BB9FA164',
  Registry: '0xA7e854ac5958C88eeB2606997f9d7aE29d572d79',
  ReverseRegistrar: '0x5232068C997290FeC69C994d492856EDA9eca0c3',
  Root: '0xd17a06B50E0a4bb4cC25dc994Dc2Bef65De23854',
  SHA1Digest: '0x894fB7A21b4b2A33f3cdC2f37112e6A3010B3c8b',
  SHA256Digest: '0xf1713562Fd687F7DC9D08e435d86D48dab8d51F3',
  StaticMetadataService: '0x413007Ecc4c381552Be17be75FDd01aad0fc95Df',
  Sunday: '0xaa07a9B74709E52fBe6D0D2222ccf8dD3097515a',
  TLDPublicSuffixList: '0xE4428b98C28B17c9A70f66eC8a47caf5B33c7023',
  TestRegistrar: '0xEf9958a03fa3a72c07dE1bAE74fa5F5e734061F9',
  TestUnwrap: '0x7C523c2CA1dd77e2a828C7F89473187293291d59',
  UniversalResolver: '0x904e3b6273499e6468B6E778317316E8E77F34e6',
}

const goerliAddress = {
  BaseRegistrarImplementation: '0xf1082d257c0771957d28544e3d3500e6854c5f34',
  BulkRenewal: '0xd1fA99Bde6a85378df590B24188376280fA7919A',
  DNSRegistrar: '0xD7cbD650f301959Cc6d84C2bbB9dF0781FfA9D8d',
  DNSSECImpl: '0xb9F417CDff30a40135F526088EF9b63a3727aC47',
  DummyAlgorithm: '0x6B186F15A590Fce06b8285E2e3b0De58993C701f',
  DummyDigest: '0x4F9921E387f1Bb3E8e6d0D2Be889d9FCEB5b356D',
  DummyOracle: '0x9F645Ab6e26BC8642BE83613Ca78E8093cd7fCc3',
  ExponentialPremiumPriceOracle: '0xd1a0e79BD7f7A14647ec9212393f149718B25eAd',
  FNSToken: '0x6847b0f743242d92faCF7c3F6f54B537C87CBFa1',
  Multicall: '0xaDB8054064F8666048EbAf75faEBf3083785F74b',
  NameWrapper: '0x595a454758737944679D88895df35d15739B22B3',
  OffchainDNSResolver: '0x6378DA240ae18FB0a3Bd05C7b187A443658Df92a',
  P256SHA256Algorithm: '0x2b964C8180E531e14C3CA23c4732D4C9C5A4352b',
  PublicResolver: '0xCfcaFd81269768b02aedd5bE1D5CcAd528274D2D',
  RSASHA1Algorithm: '0x15Af8BCC2C859Fffd36655a609249Ea49068c34A',
  RSASHA256Algorithm: '0xcf10c14dAC966001B4A4B1575da2385c82c13840',
  Receiver: '0x430aF5D22aE20BEa99abf5b9aFd7E366DE743Ba6',
  RegistrarController: '0x8b083755e6aa0a7F80E99A1BA58C6cb611F815A7',
  Registry: '0x0000017bAc246FCC3af455e8fAd20bfCa6017D69',
  ReverseRegistrar: '0x9ea9063BddE87051461e9A2d73c53556025b865a',
  Root: '0x4aD6D028207D96E158b7CEE5e034f46a47A50eF1',
  SHA1Digest: '0x6439D3887AE110d7416f7f469Ca3b0CCb33f550a',
  SHA256Digest: '0x692B632490F11a59BAE9976331108bc02408597c',
  StaticMetadataService: '0x317E8d4CEacaf030B4B93D87C06Cc6C1B23C333b',
  Sunday: '0xd31B036A11B9e4ccF25637dFB75d65f26C3f36d3',
  TLDPublicSuffixList: '0xa086Bc63F2E22e35Ed802367c0b5b43FD69614A8',
  TestRegistrar: '0x3Edb5b572631614a1Ef9f3d66F74fc5c083eb0Ca',
  TestUnwrap: '0x791adC8Dfe5367307Cad85A7a9453d55D90a1b43',
  UniversalResolver: '0x7E7315cbef6639906ad07aEb712DAdd10a13aE44',
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
  it('get contract address of the network 5', async () => {
    testAddress(goerliAddress, '5')
  })

  it('get contract address of the network 3141', async () => {
    testAddress(hyperspaceAddress, '3141')
  })

  it('get contract address of the network 1337', async () => {
    testAddress(hardhatAddress, '1337')
  })

  it('get contract address of the network 31337', async () => {
    testAddress(hardhatAddress, '31337')
  })
})
