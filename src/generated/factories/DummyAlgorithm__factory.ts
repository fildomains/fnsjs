/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  DummyAlgorithm,
  DummyAlgorithmInterface,
} from "../DummyAlgorithm";

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
    stateMutability: "view",
    type: "function",
  },
] as const;

export class DummyAlgorithm__factory {
  static readonly abi = _abi;
  static createInterface(): DummyAlgorithmInterface {
    return new utils.Interface(_abi) as DummyAlgorithmInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DummyAlgorithm {
    return new Contract(address, _abi, signerOrProvider) as DummyAlgorithm;
  }
}