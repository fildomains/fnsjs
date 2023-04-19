import { ContractName, SupportedNetworkId } from './types'

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
  BaseRegistrarImplementation: '0xae308D70Ef351D18b8758a2aE271985ba0A8e132',
  BulkRenewal: '0x9Cbd4a93CF002C194122fEB626263B25012aA5C6',
  DNSRegistrar: '0xbBc078A896F71aB77d083122FC70A975247ba188',
  DNSSECImpl: '0xdC37eaA8a18e624C93FD23e076ABE1442A585B46',
  DummyAlgorithm: '0x821751895b2083E5fcb172b1405bf795A9a65f30',
  DummyDigest: '0x243E96f4f4e1e5Ae0e9282Da5500a29D63c0Fcf4',
  DummyOracle: '0xA5b176473749146122081029E0C673fD57dBCB79',
  ExponentialPremiumPriceOracle: '0x462EE6554B4AEc1E2bC3999f9e3951e753D5f3FA',
  FNSToken: '0xa088294259293f2f090E54AD27ED1CA8964ea900',
  Multicall: '0x83C06C4256542D944066fDf9e9a95eB97b236CA3',
  NameWrapper: '0x1F7d9d95276306d271711D5D8d2CaD00e2545b03',
  OffchainDNSResolver: '0x5598C4A12e0265385BBFc3ea6bab6c002d2266AB',
  P256SHA256Algorithm: '0xEB88A54fA7a30461B3De53D6Dabd132b325e5899',
  PublicResolver: '0x55B372Ea4907A26a692BA41D0284E572d7A4e8da',
  RSASHA1Algorithm: '0xEa1eeb86C2B2003234a6077e3C55db2508AA2B09',
  RSASHA256Algorithm: '0x20c6424a0F988DE3172315D87E684cF89242698F',
  Receiver: '0x5AEa83FB029a61DFCCDA7F6bfd127556e8324C57',
  RegistrarController: '0x2f9be42d0C5052479d4E4f11C45A1B5e698DF2d8',
  Registry: '0x1bb114B571181aF18468224332539dfd781ee4ac',
  ReverseRegistrar: '0xA8114C58520FFE9D4A741eb2145D6d67E31f8c1C',
  Root: '0xE6334E7C925808B6B07899e03B3218Ff6B9430F2',
  SHA1Digest: '0xd10AE8401A8Cf770A0529eFADb07cA0C3E1AceEE',
  SHA256Digest: '0xAA667d568d1882C9c63E84fD5eF916B8126339C2',
  StaticMetadataService: '0x88c4F4783a4f27fA26c7eB105EAF881717D24908',
  Sunday: '0xBAA2e95783813D3614f19AF40E630EBf6249A773',
  TLDPublicSuffixList: '0x50c4FE83AC29baF4f39d50B0e5f28b090C3b63d8',
  TestRegistrar: '0xe9dac79a814aAC61A0C50c80B54E26F9b4b4d300',
  TestUnwrap: '0xB0DDb10BE80d1159537bf8aFa7CD1F7A2718e536',
  UniversalResolver: '0xA33Eba97dA1a047156CE658124159992Ac1c2025',
}

const filecoinAddress = {
  BaseRegistrarImplementation: '0x9F645Ab6e26BC8642BE83613Ca78E8093cd7fCc3',
  BulkRenewal: '0x15Af8BCC2C859Fffd36655a609249Ea49068c34A',
  DNSRegistrar: '0x442F550E5A51Fa7AbDe13C68eAB55c0401dd0805',
  DNSSECImpl: '0xBfcA935c1Eb34A6fDC2a4C3e141dC416aDb926ba',
  DummyOracle: '0xd1a0e79BD7f7A14647ec9212393f149718B25eAd',
  ExponentialPremiumPriceOracle: '0x317E8d4CEacaf030B4B93D87C06Cc6C1B23C333b',
  FNSToken: '0xd31B036A11B9e4ccF25637dFB75d65f26C3f36d3',
  Multicall: '0x9E54Ae8A44A951AE452e3De70c638114Fd935835',
  NameWrapper: '0x4eF97B4f33930a9AC90D2C9Daf4800cE05f8a938',
  OffchainDNSResolver: '0x2E760a1A907f79924D009c9A8bC7082b37E6F39A',
  P256SHA256Algorithm: '0xcf10c14dAC966001B4A4B1575da2385c82c13840',
  PublicResolver: '0xd1fA99Bde6a85378df590B24188376280fA7919A',
  RSASHA1Algorithm: '0x2bf0621b85D9f4C58723FaE608aeD8E78d59BbD0',
  RSASHA256Algorithm: '0x7aFe3908705B07966B6c1Fc8FC2fb08D8a99ae72',
  Receiver: '0xAEED9CA340cF01d966Fbc2699A52A966e9c3afA7',
  RegistrarController: '0x6847b0f743242d92faCF7c3F6f54B537C87CBFa1',
  Registry: '0x4aD6D028207D96E158b7CEE5e034f46a47A50eF1',
  ReverseRegistrar: '0x9ea9063BddE87051461e9A2d73c53556025b865a',
  Root: '0xeb1853698D3DbaD3f0d49D4dd57c9686Df8Eb4aB',
  SHA1Digest: '0x2b964C8180E531e14C3CA23c4732D4C9C5A4352b',
  SHA256Digest: '0x6B186F15A590Fce06b8285E2e3b0De58993C701f',
  StaticMetadataService: '0x595a454758737944679D88895df35d15739B22B3',
  Sunday: '0x430aF5D22aE20BEa99abf5b9aFd7E366DE743Ba6',
  TLDPublicSuffixList: '0xf29899eB7547472544772AB05206a3Ead920b555',
  UniversalResolver: '0x8A7CF6e19082B5431Ec44c0cfF9CE09611aD2Edb',
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

const addresses: Record<
  ContractName,
  Partial<Record<SupportedNetworkId, string>> | string
> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  BaseRegistrarImplementation: {
    '5': goerliAddress.BaseRegistrarImplementation,
    '314': filecoinAddress.BaseRegistrarImplementation,
    '3141': hyperspaceAddress.BaseRegistrarImplementation,
    '1337': hardhatAddress.BaseRegistrarImplementation,
    '31337': hardhatAddress.BaseRegistrarImplementation,
  },
  RegistrarController: {
    '5': goerliAddress.RegistrarController,
    '314': filecoinAddress.RegistrarController,
    '3141': hyperspaceAddress.RegistrarController,
    '1337': hardhatAddress.RegistrarController,
    '31337': hardhatAddress.RegistrarController,
  },
  Multicall: {
    '5': goerliAddress.Multicall,
    '314': filecoinAddress.Multicall,
    '3141': hyperspaceAddress.Multicall,
    '1337': hardhatAddress.Multicall,
    '31337': hardhatAddress.Multicall,
  },
  NameWrapper: {
    '5': goerliAddress.NameWrapper,
    '314': filecoinAddress.NameWrapper,
    '3141': hyperspaceAddress.NameWrapper,
    '1337': hardhatAddress.NameWrapper,
    '31337': hardhatAddress.NameWrapper,
  },
  DNSRegistrar: {
    '5': goerliAddress.DNSRegistrar,
    '314': filecoinAddress.DNSRegistrar,
    '3141': hyperspaceAddress.DNSRegistrar,
    '1337': hardhatAddress.DNSRegistrar,
    '31337': hardhatAddress.DNSRegistrar,
  },
  PublicResolver: {
    '5': goerliAddress.PublicResolver,
    '314': filecoinAddress.PublicResolver,
    '3141': hyperspaceAddress.PublicResolver,
    '1337': hardhatAddress.PublicResolver,
    '31337': hardhatAddress.PublicResolver,
  },
  Registry: {
    '5': goerliAddress.Registry,
    '314': filecoinAddress.Registry,
    '3141': hyperspaceAddress.Registry,
    '1337': hardhatAddress.Registry,
    '31337': hardhatAddress.Registry,
  },
  ReverseRegistrar: {
    '5': goerliAddress.ReverseRegistrar,
    '314': filecoinAddress.ReverseRegistrar,
    '3141': hyperspaceAddress.ReverseRegistrar,
    '1337': hardhatAddress.ReverseRegistrar,
    '31337': hardhatAddress.ReverseRegistrar,
  },
  UniversalResolver: {
    '5': goerliAddress.UniversalResolver,
    '314': filecoinAddress.UniversalResolver,
    '3141': hyperspaceAddress.UniversalResolver,
    '1337': hardhatAddress.UniversalResolver,
    '31337': hardhatAddress.UniversalResolver,
  },
  BulkRenewal: {
    '5': goerliAddress.BulkRenewal,
    '314': filecoinAddress.BulkRenewal,
    '3141': hyperspaceAddress.BulkRenewal,
    '1337': hardhatAddress.BulkRenewal,
    '31337': hardhatAddress.BulkRenewal,
  },
  DNSSECImpl: {
    '5': goerliAddress.DNSSECImpl,
    '314': filecoinAddress.DNSSECImpl,
    '3141': hyperspaceAddress.DNSSECImpl,
    '1337': hardhatAddress.DNSSECImpl,
    '31337': hardhatAddress.DNSSECImpl,
  },
  P256SHA256Algorithm: {
    '5': goerliAddress.P256SHA256Algorithm,
    '314': filecoinAddress.P256SHA256Algorithm,
    '3141': hyperspaceAddress.P256SHA256Algorithm,
    '1337': hardhatAddress.P256SHA256Algorithm,
    '31337': hardhatAddress.P256SHA256Algorithm,
  },
  RSASHA256Algorithm: {
    '5': goerliAddress.RSASHA256Algorithm,
    '314': filecoinAddress.RSASHA256Algorithm,
    '3141': hyperspaceAddress.RSASHA256Algorithm,
    '1337': hardhatAddress.RSASHA256Algorithm,
    '31337': hardhatAddress.RSASHA256Algorithm,
  },
  SHA1Digest: {
    '5': goerliAddress.SHA1Digest,
    '314': filecoinAddress.SHA1Digest,
    '3141': hyperspaceAddress.SHA1Digest,
    '1337': hardhatAddress.SHA1Digest,
    '31337': hardhatAddress.SHA1Digest,
  },
  Sunday: {
    '5': goerliAddress.Sunday,
    '314': filecoinAddress.Sunday,
    '3141': hyperspaceAddress.Sunday,
    '1337': hardhatAddress.Sunday,
    '31337': hardhatAddress.Sunday,
  },
  Receiver: {
    '5': goerliAddress.Receiver,
    '314': filecoinAddress.Receiver,
    '3141': hyperspaceAddress.Receiver,
    '1337': hardhatAddress.Receiver,
    '31337': hardhatAddress.Receiver,
  },
  SHA256Digest: {
    '5': goerliAddress.SHA256Digest,
    '314': filecoinAddress.SHA256Digest,
    '3141': hyperspaceAddress.SHA256Digest,
    '1337': hardhatAddress.SHA256Digest,
    '31337': hardhatAddress.SHA256Digest,
  },
  TLDPublicSuffixList: {
    '5': goerliAddress.TLDPublicSuffixList,
    '314': filecoinAddress.TLDPublicSuffixList,
    '3141': hyperspaceAddress.TLDPublicSuffixList,
    '1337': hardhatAddress.TLDPublicSuffixList,
    '31337': hardhatAddress.TLDPublicSuffixList,
  },
  FNSToken: {
    '5': goerliAddress.FNSToken,
    '314': filecoinAddress.FNSToken,
    '3141': hyperspaceAddress.FNSToken,
    '1337': hardhatAddress.FNSToken,
    '31337': hardhatAddress.FNSToken,
  },
  OffchainDNSResolver: {
    '5': goerliAddress.OffchainDNSResolver,
    '314': filecoinAddress.OffchainDNSResolver,
    '3141': hyperspaceAddress.OffchainDNSResolver,
    '1337': hardhatAddress.OffchainDNSResolver,
    '31337': hardhatAddress.OffchainDNSResolver,
  },
  RSASHA1Algorithm: {
    '5': goerliAddress.RSASHA1Algorithm,
    '314': filecoinAddress.RSASHA1Algorithm,
    '3141': hyperspaceAddress.RSASHA1Algorithm,
    '1337': hardhatAddress.RSASHA1Algorithm,
    '31337': hardhatAddress.RSASHA1Algorithm,
  },
  Root: {
    '5': goerliAddress.Root,
    '314': filecoinAddress.Root,
    '3141': hyperspaceAddress.Root,
    '1337': hardhatAddress.Root,
    '31337': hardhatAddress.Root,
  },
  StaticMetadataService: {
    '5': goerliAddress.StaticMetadataService,
    '314': filecoinAddress.StaticMetadataService,
    '3141': hyperspaceAddress.StaticMetadataService,
    '1337': hardhatAddress.StaticMetadataService,
    '31337': hardhatAddress.StaticMetadataService,
  },
  TestRegistrar: {
    '5': goerliAddress.TestRegistrar,
    '3141': hyperspaceAddress.TestRegistrar,
    '1337': hardhatAddress.TestRegistrar,
    '31337': hardhatAddress.TestRegistrar,
  },
  /* eslint-enable @typescript-eslint/naming-convention */
}

export type ContractAddressFetch = (contractName: ContractName) => string

export const getContractAddress = (networkId: SupportedNetworkId) =>
  ((contractName: ContractName) => {
    try {
      return typeof addresses[contractName] === 'string'
        ? addresses[contractName]
        : addresses[contractName][networkId]
    } catch {
      throw new Error(
        `No address for contract ${contractName} on network ${networkId}`,
      )
    }
  }) as ContractAddressFetch
