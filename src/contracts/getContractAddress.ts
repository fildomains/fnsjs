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
  TestRegistrar: '0x59F2f1fCfE2474fD5F0b9BA1E73ca90b143Eb8d0',
  UniversalResolver: '0xf5059a5D33d5853360D16C683c16e67980206f36',
  Multicall: '0x95401dc811bb5740090279Ba06cfA8fcF6113778',
  TestUnwrap: '0x998abeb3E57409262aE5b751f60747921B33613E',
}

const hyperspaceAddress = {
  BaseRegistrarImplementation: '0x7d1F7C1e0493188f7017bC160Ec7f690F488e137',
  BulkRenewal: '0x8cb861b7b2c561cd210f1bb695fe2be84f1cbd90',
  DNSRegistrar: '0x0338f5e3451dE20bd5Cfbe3127F43d4f14dCEe49',
  DNSSECImpl: '0xD89B9A2E93dE9808ef7DdaF88f7dB501a6A59bbC',
  DummyAlgorithm: '0x0de573804D5778d7411a6c2D1677aA6174297c6E',
  DummyDigest: '0xc9a4eda2C14f7422A4f401E96E6D7bE1EDC6508E',
  DummyOracle: '0x6f2085472DD9056B160Eb718780D93289C993F53',
  ExponentialPremiumPriceOracle: '0xF209Fb0A839BC96A1d3dd1ECDb464fB328D89ea5',
  FNSToken: '0x08bBE1962B23A2931e8fCD9E69593b4e95eB5D8a',
  Multicall: '0x33A15d91e10A290616f2eef4F4d479A1153cA3bA',
  NameWrapper: '0x4Dc0a386Ee570373B8ceB5D4496b6C13C88D1851',
  OffchainDNSResolver: '0xF00D08f620cca137A3ee1210A5967A075352358E',
  P256SHA256Algorithm: '0x36Dc04F0917c830C468d777db41c0b2Cec6aB353',
  PublicResolver: '0xffefad82c04dd7fa0baaaa81f49a8f902873c1eb',
  RSASHA1Algorithm: '0x84a823350f296a166Bd7802DA2D99F4C28aC3fFa',
  RSASHA256Algorithm: '0x38c5D72D0ec3DC7B0a69B809feEBB6b0432D40BE',
  Receiver: '0x0bEEbaF635C1127e530808B317D13EF6284A9BB6',
  RegistrarController: '0xe186C8E61809a36f9a565eb1F1BE42aAa8179453',
  Registry: '0x3C05cf9E7677725A56c670352f9427676D4f22E1',
  ReverseRegistrar: '0x9E13D568104860FaeB6CbDBF7F85B9258677c706',
  Root: '0xa3e50F59B4BdC66C361cE12ef0a749EAa3f1bf20',
  SHA1Digest: '0x43363E0d48e96a7eC0429EccF4a330dFdec6628d',
  SHA256Digest: '0xf326C233f598e1A59C51cF18cdD4a166E52CF83b',
  StaticMetadataService: '0xf194C3AC448bF16f4B542C2034CfF102DFc3f438',
  Sunday: '0xc9f9359296607c6D32A61146924bf5DD31dda85b',
  TLDPublicSuffixList: '0x7Dc43e2c72bE7A9a124fC0De6E6AB8562387db37',
  TestRegistrar: '0xE421e98C23dbaB44889fE030891eDea70Ae7E083',
  TestUnwrap: '0xfc6Ce40b32Ec431ACe7cF6b95f2D1E1B3255518c',
  UniversalResolver: '0xa411FDF4d773223C89823F6b2091d75132788103',
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
    '3141': hyperspaceAddress.BaseRegistrarImplementation,
    '1337': hardhatAddress.BaseRegistrarImplementation,
    '31337': hardhatAddress.BaseRegistrarImplementation,
  },
  RegistrarController: {
    '5': goerliAddress.RegistrarController,
    '3141': hyperspaceAddress.RegistrarController,
    '1337': hardhatAddress.RegistrarController,
    '31337': hardhatAddress.RegistrarController,
  },
  Multicall: {
    '5': goerliAddress.Multicall,
    '3141': hyperspaceAddress.Multicall,
    '1337': hardhatAddress.Multicall,
    '31337': hardhatAddress.Multicall,
  },
  NameWrapper: {
    '5': goerliAddress.NameWrapper,
    '3141': hyperspaceAddress.NameWrapper,
    '1337': hardhatAddress.NameWrapper,
    '31337': hardhatAddress.NameWrapper,
  },
  DNSRegistrar: {
    '5': goerliAddress.DNSRegistrar,
    '3141': hyperspaceAddress.DNSRegistrar,
    '1337': hardhatAddress.DNSRegistrar,
    '31337': hardhatAddress.DNSRegistrar,
  },
  PublicResolver: {
    '5': goerliAddress.PublicResolver,
    '3141': hyperspaceAddress.PublicResolver,
    '1337': hardhatAddress.PublicResolver,
    '31337': hardhatAddress.PublicResolver,
  },
  Registry: {
    '5': goerliAddress.Registry,
    '3141': hyperspaceAddress.Registry,
    '1337': hardhatAddress.Registry,
    '31337': hardhatAddress.Registry,
  },
  ReverseRegistrar: {
    '5': goerliAddress.ReverseRegistrar,
    '3141': hyperspaceAddress.ReverseRegistrar,
    '1337': hardhatAddress.ReverseRegistrar,
    '31337': hardhatAddress.ReverseRegistrar,
  },
  UniversalResolver: {
    '5': goerliAddress.UniversalResolver,
    '3141': hyperspaceAddress.UniversalResolver,
    '1337': hardhatAddress.UniversalResolver,
    '31337': hardhatAddress.UniversalResolver,
  },
  BulkRenewal: {
    '5': goerliAddress.BulkRenewal,
    '3141': hyperspaceAddress.BulkRenewal,
    '1337': hardhatAddress.BulkRenewal,
    '31337': hardhatAddress.BulkRenewal,
  },
  DNSSECImpl: {
    '5': goerliAddress.DNSSECImpl,
    '3141': hyperspaceAddress.DNSSECImpl,
    '1337': hardhatAddress.DNSSECImpl,
    '31337': hardhatAddress.DNSSECImpl,
  },
  P256SHA256Algorithm: {
    '5': goerliAddress.P256SHA256Algorithm,
    '3141': hyperspaceAddress.P256SHA256Algorithm,
    '1337': hardhatAddress.P256SHA256Algorithm,
    '31337': hardhatAddress.P256SHA256Algorithm,
  },
  RSASHA256Algorithm: {
    '5': goerliAddress.RSASHA256Algorithm,
    '3141': hyperspaceAddress.RSASHA256Algorithm,
    '1337': hardhatAddress.RSASHA256Algorithm,
    '31337': hardhatAddress.RSASHA256Algorithm,
  },
  SHA1Digest: {
    '5': goerliAddress.SHA1Digest,
    '3141': hyperspaceAddress.SHA1Digest,
    '1337': hardhatAddress.SHA1Digest,
    '31337': hardhatAddress.SHA1Digest,
  },
  Sunday: {
    '5': goerliAddress.Sunday,
    '3141': hyperspaceAddress.Sunday,
    '1337': hardhatAddress.Sunday,
    '31337': hardhatAddress.Sunday,
  },
  Receiver: {
    '5': goerliAddress.Receiver,
    '3141': hyperspaceAddress.Receiver,
    '1337': hardhatAddress.Receiver,
    '31337': hardhatAddress.Receiver,
  },
  SHA256Digest: {
    '5': goerliAddress.SHA256Digest,
    '3141': hyperspaceAddress.SHA256Digest,
    '1337': hardhatAddress.SHA256Digest,
    '31337': hardhatAddress.SHA256Digest,
  },
  TLDPublicSuffixList: {
    '5': goerliAddress.TLDPublicSuffixList,
    '3141': hyperspaceAddress.TLDPublicSuffixList,
    '1337': hardhatAddress.TLDPublicSuffixList,
    '31337': hardhatAddress.TLDPublicSuffixList,
  },
  FNSToken: {
    '5': goerliAddress.FNSToken,
    '3141': hyperspaceAddress.FNSToken,
    '1337': hardhatAddress.FNSToken,
    '31337': hardhatAddress.FNSToken,
  },
  OffchainDNSResolver: {
    '5': goerliAddress.OffchainDNSResolver,
    '3141': hyperspaceAddress.OffchainDNSResolver,
    '1337': hardhatAddress.OffchainDNSResolver,
    '31337': hardhatAddress.OffchainDNSResolver,
  },
  RSASHA1Algorithm: {
    '5': goerliAddress.RSASHA1Algorithm,
    '3141': hyperspaceAddress.RSASHA1Algorithm,
    '1337': hardhatAddress.RSASHA1Algorithm,
    '31337': hardhatAddress.RSASHA1Algorithm,
  },
  Root: {
    '5': goerliAddress.Root,
    '3141': hyperspaceAddress.Root,
    '1337': hardhatAddress.Root,
    '31337': hardhatAddress.Root,
  },
  StaticMetadataService: {
    '5': goerliAddress.StaticMetadataService,
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
