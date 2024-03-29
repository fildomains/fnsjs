/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace DNSSEC {
  export type RRSetWithSignatureStruct = {
    rrset: PromiseOrValue<BytesLike>;
    sig: PromiseOrValue<BytesLike>;
  };

  export type RRSetWithSignatureStructOutput = [string, string] & {
    rrset: string;
    sig: string;
  };
}

export interface DNSRegistrarInterface extends utils.Interface {
  functions: {
    "enableNode(bytes)": FunctionFragment;
    "fns()": FunctionFragment;
    "inceptions(bytes32)": FunctionFragment;
    "oracle()": FunctionFragment;
    "previousRegistrar()": FunctionFragment;
    "proveAndClaim(bytes,(bytes,bytes)[])": FunctionFragment;
    "proveAndClaimWithResolver(bytes,(bytes,bytes)[],address,address)": FunctionFragment;
    "resolver()": FunctionFragment;
    "setPublicSuffixList(address)": FunctionFragment;
    "suffixes()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "enableNode"
      | "fns"
      | "inceptions"
      | "oracle"
      | "previousRegistrar"
      | "proveAndClaim"
      | "proveAndClaimWithResolver"
      | "resolver"
      | "setPublicSuffixList"
      | "suffixes"
      | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "enableNode",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "fns", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "inceptions",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "previousRegistrar",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proveAndClaim",
    values: [PromiseOrValue<BytesLike>, DNSSEC.RRSetWithSignatureStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "proveAndClaimWithResolver",
    values: [
      PromiseOrValue<BytesLike>,
      DNSSEC.RRSetWithSignatureStruct[],
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "resolver", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setPublicSuffixList",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "suffixes", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "enableNode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fns", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "inceptions", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "previousRegistrar",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proveAndClaim",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proveAndClaimWithResolver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resolver", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPublicSuffixList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "suffixes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "Claim(bytes32,address,bytes,uint32)": EventFragment;
    "NewPublicSuffixList(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPublicSuffixList"): EventFragment;
}

export interface ClaimEventObject {
  node: string;
  owner: string;
  dnsname: string;
  inception: number;
}
export type ClaimEvent = TypedEvent<
  [string, string, string, number],
  ClaimEventObject
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export interface NewPublicSuffixListEventObject {
  suffixes: string;
}
export type NewPublicSuffixListEvent = TypedEvent<
  [string],
  NewPublicSuffixListEventObject
>;

export type NewPublicSuffixListEventFilter =
  TypedEventFilter<NewPublicSuffixListEvent>;

export interface DNSRegistrar extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DNSRegistrarInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    enableNode(
      domain: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fns(overrides?: CallOverrides): Promise<[string]>;

    inceptions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    oracle(overrides?: CallOverrides): Promise<[string]>;

    previousRegistrar(overrides?: CallOverrides): Promise<[string]>;

    proveAndClaim(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proveAndClaimWithResolver(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      _resolver: PromiseOrValue<string>,
      addr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    resolver(overrides?: CallOverrides): Promise<[string]>;

    setPublicSuffixList(
      _suffixes: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    suffixes(overrides?: CallOverrides): Promise<[string]>;

    supportsInterface(
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  enableNode(
    domain: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fns(overrides?: CallOverrides): Promise<string>;

  inceptions(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<number>;

  oracle(overrides?: CallOverrides): Promise<string>;

  previousRegistrar(overrides?: CallOverrides): Promise<string>;

  proveAndClaim(
    name: PromiseOrValue<BytesLike>,
    input: DNSSEC.RRSetWithSignatureStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proveAndClaimWithResolver(
    name: PromiseOrValue<BytesLike>,
    input: DNSSEC.RRSetWithSignatureStruct[],
    _resolver: PromiseOrValue<string>,
    addr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  resolver(overrides?: CallOverrides): Promise<string>;

  setPublicSuffixList(
    _suffixes: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  suffixes(overrides?: CallOverrides): Promise<string>;

  supportsInterface(
    interfaceID: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    enableNode(
      domain: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    fns(overrides?: CallOverrides): Promise<string>;

    inceptions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<number>;

    oracle(overrides?: CallOverrides): Promise<string>;

    previousRegistrar(overrides?: CallOverrides): Promise<string>;

    proveAndClaim(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    proveAndClaimWithResolver(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      _resolver: PromiseOrValue<string>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    resolver(overrides?: CallOverrides): Promise<string>;

    setPublicSuffixList(
      _suffixes: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    suffixes(overrides?: CallOverrides): Promise<string>;

    supportsInterface(
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Claim(bytes32,address,bytes,uint32)"(
      node?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      dnsname?: null,
      inception?: null
    ): ClaimEventFilter;
    Claim(
      node?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      dnsname?: null,
      inception?: null
    ): ClaimEventFilter;

    "NewPublicSuffixList(address)"(
      suffixes?: null
    ): NewPublicSuffixListEventFilter;
    NewPublicSuffixList(suffixes?: null): NewPublicSuffixListEventFilter;
  };

  estimateGas: {
    enableNode(
      domain: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fns(overrides?: CallOverrides): Promise<BigNumber>;

    inceptions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    previousRegistrar(overrides?: CallOverrides): Promise<BigNumber>;

    proveAndClaim(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proveAndClaimWithResolver(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      _resolver: PromiseOrValue<string>,
      addr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    setPublicSuffixList(
      _suffixes: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    suffixes(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    enableNode(
      domain: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fns(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    inceptions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    previousRegistrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proveAndClaim(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proveAndClaimWithResolver(
      name: PromiseOrValue<BytesLike>,
      input: DNSSEC.RRSetWithSignatureStruct[],
      _resolver: PromiseOrValue<string>,
      addr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPublicSuffixList(
      _suffixes: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    suffixes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
