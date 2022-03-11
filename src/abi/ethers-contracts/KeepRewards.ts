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

export interface KeepRewardsInterface extends utils.Interface {
  contractName: "KeepRewards";
  functions: {
    "DURATION()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "earned(address)": FunctionFragment;
    "exit()": FunctionFragment;
    "gated()": FunctionFragment;
    "getReward()": FunctionFragment;
    "isOwner()": FunctionFragment;
    "keepToken()": FunctionFragment;
    "lastTimeRewardApplicable()": FunctionFragment;
    "lastUpdateTime()": FunctionFragment;
    "notifyRewardAmount(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "periodFinish()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rewardPerToken()": FunctionFragment;
    "rewardPerTokenStored()": FunctionFragment;
    "rewardRate()": FunctionFragment;
    "rewards(address)": FunctionFragment;
    "setGated(bool)": FunctionFragment;
    "setRewardDistribution(address)": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "userRewardPerTokenPaid(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "wrappedToken()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "DURATION", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "earned", values: [string]): string;
  encodeFunctionData(functionFragment: "exit", values?: undefined): string;
  encodeFunctionData(functionFragment: "gated", values?: undefined): string;
  encodeFunctionData(functionFragment: "getReward", values?: undefined): string;
  encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "keepToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastTimeRewardApplicable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastUpdateTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "notifyRewardAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "periodFinish",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerTokenStored",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rewards", values: [string]): string;
  encodeFunctionData(functionFragment: "setGated", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "setRewardDistribution",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "userRewardPerTokenPaid",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "wrappedToken",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "DURATION", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "earned", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gated", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getReward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "keepToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastTimeRewardApplicable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastUpdateTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "notifyRewardAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "periodFinish",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerTokenStored",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewards", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGated", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRewardDistribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userRewardPerTokenPaid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wrappedToken",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "RewardAdded(uint256)": EventFragment;
    "RewardPaid(address,uint256)": EventFragment;
    "Staked(address,uint256)": EventFragment;
    "Withdrawn(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardPaid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RewardAddedEvent = TypedEvent<[BigNumber], { reward: BigNumber }>;

export type RewardAddedEventFilter = TypedEventFilter<RewardAddedEvent>;

export type RewardPaidEvent = TypedEvent<
  [string, BigNumber],
  { user: string; reward: BigNumber }
>;

export type RewardPaidEventFilter = TypedEventFilter<RewardPaidEvent>;

export type StakedEvent = TypedEvent<
  [string, BigNumber],
  { user: string; amount: BigNumber }
>;

export type StakedEventFilter = TypedEventFilter<StakedEvent>;

export type WithdrawnEvent = TypedEvent<
  [string, BigNumber],
  { user: string; amount: BigNumber }
>;

export type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;

export interface KeepRewards extends BaseContract {
  contractName: "KeepRewards";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: KeepRewardsInterface;

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
    DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    earned(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    exit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    gated(overrides?: CallOverrides): Promise<[boolean]>;

    getReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isOwner(overrides?: CallOverrides): Promise<[boolean]>;

    keepToken(overrides?: CallOverrides): Promise<[string]>;

    lastTimeRewardApplicable(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastUpdateTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    notifyRewardAmount(
      reward: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    periodFinish(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardPerToken(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardPerTokenStored(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewards(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    setGated(
      _gated: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewardDistribution(
      _rewardDistribution: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userRewardPerTokenPaid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wrappedToken(overrides?: CallOverrides): Promise<[string]>;
  };

  DURATION(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  earned(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  exit(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  gated(overrides?: CallOverrides): Promise<boolean>;

  getReward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isOwner(overrides?: CallOverrides): Promise<boolean>;

  keepToken(overrides?: CallOverrides): Promise<string>;

  lastTimeRewardApplicable(overrides?: CallOverrides): Promise<BigNumber>;

  lastUpdateTime(overrides?: CallOverrides): Promise<BigNumber>;

  notifyRewardAmount(
    reward: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  periodFinish(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardPerToken(overrides?: CallOverrides): Promise<BigNumber>;

  rewardPerTokenStored(overrides?: CallOverrides): Promise<BigNumber>;

  rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  rewards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  setGated(
    _gated: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewardDistribution(
    _rewardDistribution: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userRewardPerTokenPaid(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wrappedToken(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    earned(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    exit(overrides?: CallOverrides): Promise<void>;

    gated(overrides?: CallOverrides): Promise<boolean>;

    getReward(overrides?: CallOverrides): Promise<void>;

    isOwner(overrides?: CallOverrides): Promise<boolean>;

    keepToken(overrides?: CallOverrides): Promise<string>;

    lastTimeRewardApplicable(overrides?: CallOverrides): Promise<BigNumber>;

    lastUpdateTime(overrides?: CallOverrides): Promise<BigNumber>;

    notifyRewardAmount(
      reward: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    periodFinish(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rewardPerToken(overrides?: CallOverrides): Promise<BigNumber>;

    rewardPerTokenStored(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    rewards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    setGated(_gated: boolean, overrides?: CallOverrides): Promise<void>;

    setRewardDistribution(
      _rewardDistribution: string,
      overrides?: CallOverrides
    ): Promise<void>;

    stake(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    userRewardPerTokenPaid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    wrappedToken(overrides?: CallOverrides): Promise<string>;
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

    "RewardAdded(uint256)"(reward?: null): RewardAddedEventFilter;
    RewardAdded(reward?: null): RewardAddedEventFilter;

    "RewardPaid(address,uint256)"(
      user?: string | null,
      reward?: null
    ): RewardPaidEventFilter;
    RewardPaid(user?: string | null, reward?: null): RewardPaidEventFilter;

    "Staked(address,uint256)"(
      user?: string | null,
      amount?: null
    ): StakedEventFilter;
    Staked(user?: string | null, amount?: null): StakedEventFilter;

    "Withdrawn(address,uint256)"(
      user?: string | null,
      amount?: null
    ): WithdrawnEventFilter;
    Withdrawn(user?: string | null, amount?: null): WithdrawnEventFilter;
  };

  estimateGas: {
    DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    earned(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    exit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    gated(overrides?: CallOverrides): Promise<BigNumber>;

    getReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isOwner(overrides?: CallOverrides): Promise<BigNumber>;

    keepToken(overrides?: CallOverrides): Promise<BigNumber>;

    lastTimeRewardApplicable(overrides?: CallOverrides): Promise<BigNumber>;

    lastUpdateTime(overrides?: CallOverrides): Promise<BigNumber>;

    notifyRewardAmount(
      reward: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    periodFinish(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardPerToken(overrides?: CallOverrides): Promise<BigNumber>;

    rewardPerTokenStored(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    rewards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    setGated(
      _gated: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewardDistribution(
      _rewardDistribution: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userRewardPerTokenPaid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wrappedToken(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    earned(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    gated(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    keepToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastTimeRewardApplicable(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastUpdateTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    notifyRewardAmount(
      reward: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    periodFinish(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardPerToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardPerTokenStored(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setGated(
      _gated: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewardDistribution(
      _rewardDistribution: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userRewardPerTokenPaid(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wrappedToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}