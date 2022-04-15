/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace VestingStake {
  export type LockVeStruct = {
    startBlockTime: BigNumberish;
    endBlockTime: BigNumberish;
    startingAmountLocked: BigNumberish;
    initialized: boolean;
  };

  export type LockVeStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ] & {
    startBlockTime: BigNumber;
    endBlockTime: BigNumber;
    startingAmountLocked: BigNumber;
    initialized: boolean;
  };
}

export interface SAxialInterface extends utils.Interface {
  contractName: "SAxial";
  functions: {
    "balanceOf(address)": FunctionFragment;
    "claimMyFunds()": FunctionFragment;
    "getAllUsers()": FunctionFragment;
    "getBalance(address)": FunctionFragment;
    "getLock(address)": FunctionFragment;
    "getPower(address)": FunctionFragment;
    "getUnclaimed(address)": FunctionFragment;
    "isUserLocked(address)": FunctionFragment;
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerRemoveNonDepositToken(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "stake(uint256,uint256,bool)": FunctionFragment;
    "stakedToken()": FunctionFragment;
    "symbol()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "claimMyFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllUsers",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getBalance", values: [string]): string;
  encodeFunctionData(functionFragment: "getLock", values: [string]): string;
  encodeFunctionData(functionFragment: "getPower", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getUnclaimed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isUserLocked",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerRemoveNonDepositToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "stakedToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimMyFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllUsers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getLock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPower", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUnclaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isUserLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerRemoveNonDepositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "userClaimed(address,uint256)": EventFragment;
    "userExtended(address,uint256,uint256)": EventFragment;
    "userStaked(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "userClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "userExtended"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "userStaked"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type userClaimedEvent = TypedEvent<
  [string, BigNumber],
  { user: string; amount: BigNumber }
>;

export type userClaimedEventFilter = TypedEventFilter<userClaimedEvent>;

export type userExtendedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { user: string; amount: BigNumber; duration: BigNumber }
>;

export type userExtendedEventFilter = TypedEventFilter<userExtendedEvent>;

export type userStakedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { user: string; amount: BigNumber; duration: BigNumber }
>;

export type userStakedEventFilter = TypedEventFilter<userStakedEvent>;

export interface SAxial extends BaseContract {
  contractName: "SAxial";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SAxialInterface;

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
    balanceOf(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    claimMyFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAllUsers(overrides?: CallOverrides): Promise<[string[]]>;

    getBalance(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLock(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<[VestingStake.LockVeStructOutput]>;

    getPower(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUnclaimed(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isUserLocked(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerRemoveNonDepositToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      _duration: BigNumberish,
      _amount: BigNumberish,
      _deferUnclaimed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakedToken(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  balanceOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

  claimMyFunds(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAllUsers(overrides?: CallOverrides): Promise<string[]>;

  getBalance(_userAddr: string, overrides?: CallOverrides): Promise<BigNumber>;

  getLock(
    _userAddr: string,
    overrides?: CallOverrides
  ): Promise<VestingStake.LockVeStructOutput>;

  getPower(_userAddr: string, overrides?: CallOverrides): Promise<BigNumber>;

  getUnclaimed(
    _userAddr: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isUserLocked(_userAddr: string, overrides?: CallOverrides): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerRemoveNonDepositToken(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    _duration: BigNumberish,
    _amount: BigNumberish,
    _deferUnclaimed: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakedToken(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    balanceOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimMyFunds(overrides?: CallOverrides): Promise<void>;

    getAllUsers(overrides?: CallOverrides): Promise<string[]>;

    getBalance(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLock(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<VestingStake.LockVeStructOutput>;

    getPower(_userAddr: string, overrides?: CallOverrides): Promise<BigNumber>;

    getUnclaimed(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isUserLocked(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerRemoveNonDepositToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    stake(
      _duration: BigNumberish,
      _amount: BigNumberish,
      _deferUnclaimed: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    stakedToken(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "userClaimed(address,uint256)"(
      user?: string | null,
      amount?: null
    ): userClaimedEventFilter;
    userClaimed(user?: string | null, amount?: null): userClaimedEventFilter;

    "userExtended(address,uint256,uint256)"(
      user?: string | null,
      amount?: null,
      duration?: null
    ): userExtendedEventFilter;
    userExtended(
      user?: string | null,
      amount?: null,
      duration?: null
    ): userExtendedEventFilter;

    "userStaked(address,uint256,uint256)"(
      user?: string | null,
      amount?: null,
      duration?: null
    ): userStakedEventFilter;
    userStaked(
      user?: string | null,
      amount?: null,
      duration?: null
    ): userStakedEventFilter;
  };

  estimateGas: {
    balanceOf(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimMyFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAllUsers(overrides?: CallOverrides): Promise<BigNumber>;

    getBalance(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLock(_userAddr: string, overrides?: CallOverrides): Promise<BigNumber>;

    getPower(_userAddr: string, overrides?: CallOverrides): Promise<BigNumber>;

    getUnclaimed(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isUserLocked(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerRemoveNonDepositToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      _duration: BigNumberish,
      _amount: BigNumberish,
      _deferUnclaimed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakedToken(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimMyFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAllUsers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBalance(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLock(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPower(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUnclaimed(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isUserLocked(
      _userAddr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerRemoveNonDepositToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _duration: BigNumberish,
      _amount: BigNumberish,
      _deferUnclaimed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakedToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}