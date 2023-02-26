/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { DummyDigest, DummyDigestInterface } from "../DummyDigest";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "verify",
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

export class DummyDigest__factory {
  static readonly abi = _abi;
  static createInterface(): DummyDigestInterface {
    return new utils.Interface(_abi) as DummyDigestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DummyDigest {
    return new Contract(address, _abi, signerOrProvider) as DummyDigest;
  }
}
