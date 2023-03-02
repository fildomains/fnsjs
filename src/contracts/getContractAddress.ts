import { ContractName, SupportedNetworkId } from './types'

const hardhatAddress = {
  Registry: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  Root: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  BaseRegistrarImplementation: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  DummyOracle: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  ExponentialPremiumPriceOracle: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  ReverseRegistrar: '0x71C95911E9a5D330f4D621842EC243EE1343292e',
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
  TestRegistrar: '0x712516e61C8B383dF4A63CFe83d7701Bce54B03e',
  UniversalResolver: '0xf5059a5D33d5853360D16C683c16e67980206f36',
  Multicall: '0x95401dc811bb5740090279Ba06cfA8fcF6113778',
}

const addresses: Record<
  ContractName,
  Partial<Record<SupportedNetworkId, string>> | string
> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  BaseRegistrarImplementation: {
    '1337': hardhatAddress.BaseRegistrarImplementation,
    '31337': hardhatAddress.BaseRegistrarImplementation,
  },
  RegistrarController: {
    '1337': hardhatAddress.RegistrarController,
    '31337': hardhatAddress.RegistrarController,
  },
  Multicall: {
    '1337': hardhatAddress.Multicall,
    '31337': hardhatAddress.Multicall,
  },
  NameWrapper: {
    '1337': hardhatAddress.NameWrapper,
    '31337': hardhatAddress.NameWrapper,
  },
  DNSRegistrar: {
    '1337': hardhatAddress.DNSRegistrar,
    '31337': hardhatAddress.DNSRegistrar,
  },
  PublicResolver: {
    '1337': hardhatAddress.PublicResolver,
    '31337': hardhatAddress.PublicResolver,
  },
  Registry: {
    '1337': hardhatAddress.Registry,
    '31337': hardhatAddress.Registry,
  },
  ReverseRegistrar: {
    '1337': hardhatAddress.ReverseRegistrar,
    '31337': hardhatAddress.ReverseRegistrar,
  },
  UniversalResolver: {
    '1337': hardhatAddress.UniversalResolver,
    '31337': hardhatAddress.UniversalResolver,
  },
  BulkRenewal: {
    '1337': hardhatAddress.BulkRenewal,
    '31337': hardhatAddress.BulkRenewal,
  },
  DNSSECImpl: {
    '1337': hardhatAddress.DNSSECImpl,
    '31337': hardhatAddress.DNSSECImpl,
  },
  P256SHA256Algorithm: {
    '1337': hardhatAddress.P256SHA256Algorithm,
    '31337': hardhatAddress.P256SHA256Algorithm,
  },
  RSASHA256Algorithm: {
    '1337': hardhatAddress.RSASHA256Algorithm,
    '31337': hardhatAddress.RSASHA256Algorithm,
  },
  SHA1Digest: {
    '1337': hardhatAddress.SHA1Digest,
    '31337': hardhatAddress.SHA1Digest,
  },
  Sunday: {
    '1337': hardhatAddress.Sunday,
    '31337': hardhatAddress.Sunday,
  },
  Receiver: {
    '1337': hardhatAddress.Receiver,
    '31337': hardhatAddress.Receiver,
  },
  SHA256Digest: {
    '1337': hardhatAddress.SHA256Digest,
    '31337': hardhatAddress.SHA256Digest,
  },
  TLDPublicSuffixList: {
    '1337': hardhatAddress.TLDPublicSuffixList,
    '31337': hardhatAddress.TLDPublicSuffixList,
  },
  FNSToken: {
    '1337': hardhatAddress.FNSToken,
    '31337': hardhatAddress.FNSToken,
  },
  OffchainDNSResolver: {
    '1337': hardhatAddress.OffchainDNSResolver,
    '31337': hardhatAddress.OffchainDNSResolver,
  },
  RSASHA1Algorithm: {
    '1337': hardhatAddress.RSASHA1Algorithm,
    '31337': hardhatAddress.RSASHA1Algorithm,
  },
  Root: {
    '1337': hardhatAddress.Root,
    '31337': hardhatAddress.Root,
  },
  StaticMetadataService: {
    '1337': hardhatAddress.StaticMetadataService,
    '31337': hardhatAddress.StaticMetadataService,
  },
  TestRegistrar: {
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
