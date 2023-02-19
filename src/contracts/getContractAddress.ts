import { ContractName, SupportedNetworkId } from './types'

const hardhatAddress = {
  "Registry": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "Root": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "BaseRegistrarImplementation": "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  "DummyOracle": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  "ExponentialPremiumPriceOracle": "0x0165878A594ca255338adfa4d48449f69242Eb8F",
  "ReverseRegistrar": "0x71C95911E9a5D330f4D621842EC243EE1343292e",
  "StaticMetadataService": "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
  "NameWrapper": "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
  "RegistrarController": "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
  "PublicResolver": "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
  "BulkRenewal": "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
  "RSASHA1Algorithm": "0x9A676e781A523b5d0C0e43731313A708CB607508",
  "RSASHA256Algorithm": "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
  "P256SHA256Algorithm": "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
  "DummyAlgorithm": "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE",
  "SHA1Digest": "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
  "SHA256Digest": "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
  "DummyDigest": "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
  "DNSSECImpl": "0x59b670e9fA9D0A427751Af201D676719a970857b",
  "TLDPublicSuffixList": "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690",
  "DNSRegistrar": "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB",
  "TestRegistrar": "0xbCF26943C0197d2eE0E5D05c716Be60cc2761508",
  "Multicall": "0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9",
  "UniversalResolver": "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8"
}

const addresses: Record<
  ContractName,
  Partial<Record<SupportedNetworkId, string>> | string
> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  BaseRegistrarImplementation: {
    '1': '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    '3': '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    '4': '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    '5': '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    '31337': hardhatAddress.BaseRegistrarImplementation,
  },
  DNSRegistrar: {
    '1': '0x58774Bb8acD458A640aF0B88238369A167546ef2',
    '3': '0xdB328BA5FEcb432AF325Ca59E3778441eF5aa14F',
    '5': '0x8edc487D26F6c8Fa76e032066A3D4F87E273515d',
    '31337': hardhatAddress.DNSRegistrar,
  },
  RegistrarController: {
    '1': '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
    '3': '0xa5627AB7Ae47063B533622C34FEBDb52d3281dF8',
    '4': '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
    '5': '0x8D28d88A8081280d7458d860FFFC54284C8d8331',
    '31337': hardhatAddress.RegistrarController,
  },
  Multicall: {
    '1': '0xcA11bde05977b3631167028862bE2a173976CA11',
    '3': '0xcA11bde05977b3631167028862bE2a173976CA11',
    '4': '0xcA11bde05977b3631167028862bE2a173976CA11',
    '5': '0xcA11bde05977b3631167028862bE2a173976CA11',
    '31337': hardhatAddress.Multicall,
  },
  NameWrapper: {
    '1': '0x0000000000000000000000000000000000000000',
    '3': '0xF82155e2a43Be0871821E9654Fc8Ae894FB8307C',
    '4': '0x0000000000000000000000000000000000000000',
    '5': '0x582224b8d4534F4749EFA4f22eF7241E0C56D4B8',
    '31337': hardhatAddress.NameWrapper,
  },
  PublicResolver: {
    '1': '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    '3': '0x13F0659Ee6bb7484C884FEeFb7F75C93951ef837',
    '5': '0xE264d5bb84bA3b8061ADC38D3D76e6674aB91852',
    '31337': hardhatAddress.PublicResolver,
  },
  Registry: {
    '1': '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e',
    '3': '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e',
    '4': '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e',
    '5': '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e',
    '31337': hardhatAddress.Registry,
  },
  ReverseRegistrar: {
    '1': '0x084b1c3C81545d370f3634392De611CaaBFf8148',
    '3': '0x806246b52f8cB61655d3038c58D2f63Aa55d4edE',
    '5': '0xD5610A08E370051a01fdfe4bB3ddf5270af1aA48',
    '31337': hardhatAddress.ReverseRegistrar,
  },
  UniversalResolver: {
    '1': '0x580AF46E06DaaD47eb5940526FD64d95b815Cb70',
    '3': '0x74e20bd2a1fe0cdbe45b9a1d89cb7e0a45b36376',
    '4': '0x74e20bd2a1fe0cdbe45b9a1d89cb7e0a45b36376',
    '5': '0x687c30Cc44bFA39A1449e86E172BF002E7b3f0b0',
    '31337': hardhatAddress.UniversalResolver,
  },
  BulkRenewal: {
    '1': '0xfF252725f6122A92551A5FA9a6b6bf10eb0Be035',
    '3': '0x051b02245D826757EfaF5C6209D4D79FB39FBC45',
    '5': '0xa9e1df95a79C768aA435805b28E1B54Bb5ead063',
    '31337': hardhatAddress.BulkRenewal,
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
