/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { DNSRegistrar, DNSRegistrarInterface } from "../DNSRegistrar";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract DNSSEC",
        name: "_dnssec",
        type: "address",
      },
      {
        internalType: "contract PublicSuffixList",
        name: "_suffixes",
        type: "address",
      },
      {
        internalType: "contract FNS",
        name: "_fns",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NoOwnerRecordFound",
    type: "error",
  },
  {
    inputs: [],
    name: "StaleProof",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "dnsname",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "inception",
        type: "uint32",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oracle",
        type: "address",
      },
    ],
    name: "NewOracle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "suffixes",
        type: "address",
      },
    ],
    name: "NewPublicSuffixList",
    type: "event",
  },
  {
    inputs: [],
    name: "fns",
    outputs: [
      {
        internalType: "contract FNS",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "inceptions",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract DNSSEC",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "rrset",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes",
          },
        ],
        internalType: "struct DNSSEC.RRSetWithSignature[]",
        name: "input",
        type: "tuple[]",
      },
    ],
    name: "proveAndClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "rrset",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes",
          },
        ],
        internalType: "struct DNSSEC.RRSetWithSignature[]",
        name: "input",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "proveAndClaimWithResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract PublicSuffixList",
        name: "_suffixes",
        type: "address",
      },
    ],
    name: "setPublicSuffixList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "suffixes",
    outputs: [
      {
        internalType: "contract PublicSuffixList",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceID",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class DNSRegistrar__factory {
  static readonly abi = _abi;
  static createInterface(): DNSRegistrarInterface {
    return new utils.Interface(_abi) as DNSRegistrarInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DNSRegistrar {
    return new Contract(address, _abi, signerOrProvider) as DNSRegistrar;
  }
}
