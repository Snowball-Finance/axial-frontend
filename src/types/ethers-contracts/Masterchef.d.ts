/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MasterchefInterface extends ethers.utils.Interface {
  functions: {
    "AXIAL()": FunctionFragment;
    "MASTER_CHEF_V2()": FunctionFragment;
    "MASTER_PID()": FunctionFragment;
    "add(uint256,address,address)": FunctionFragment;
    "axialPerSec()": FunctionFragment;
    "deposit(uint256,uint256)": FunctionFragment;
    "emergencyWithdraw(uint256)": FunctionFragment;
    "harvestFromMasterChef()": FunctionFragment;
    "init(address)": FunctionFragment;
    "massUpdatePools(uint256[])": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingTokens(uint256,address)": FunctionFragment;
    "poolInfo(uint256)": FunctionFragment;
    "poolLength()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "set(uint256,uint256,address,bool)": FunctionFragment;
    "totalAllocPoint()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updatePool(uint256)": FunctionFragment;
    "userInfo(uint256,address)": FunctionFragment;
    "withdraw(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "AXIAL", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "MASTER_CHEF_V2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MASTER_PID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "add",
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "axialPerSec",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "harvestFromMasterChef",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "init", values: [string]): string;
  encodeFunctionData(
    functionFragment: "massUpdatePools",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingTokens",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "poolInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "poolLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "set",
    values: [BigNumberish, BigNumberish, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "totalAllocPoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePool",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userInfo",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "AXIAL", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "MASTER_CHEF_V2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "MASTER_PID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "add", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "axialPerSec",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "harvestFromMasterChef",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "massUpdatePools",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolLength", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAllocPoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updatePool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Add(uint256,uint256,address,address)": EventFragment;
    "Deposit(address,uint256,uint256)": EventFragment;
    "EmergencyWithdraw(address,uint256,uint256)": EventFragment;
    "Harvest(address,uint256,uint256)": EventFragment;
    "Init()": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Set(uint256,uint256,address,bool)": EventFragment;
    "UpdatePool(uint256,uint256,uint256,uint256)": EventFragment;
    "Withdraw(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Add"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EmergencyWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Harvest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Init"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Set"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatePool"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export class Masterchef extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MasterchefInterface;

  functions: {
    AXIAL(overrides?: CallOverrides): Promise<[string]>;

    "AXIAL()"(overrides?: CallOverrides): Promise<[string]>;

    MASTER_CHEF_V2(overrides?: CallOverrides): Promise<[string]>;

    "MASTER_CHEF_V2()"(overrides?: CallOverrides): Promise<[string]>;

    MASTER_PID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MASTER_PID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    add(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "add(uint256,address,address)"(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    axialPerSec(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    "axialPerSec()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    deposit(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deposit(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "emergencyWithdraw(uint256)"(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    harvestFromMasterChef(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "harvestFromMasterChef()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    init(
      dummyToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "init(address)"(
      dummyToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    massUpdatePools(
      pids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "massUpdatePools(uint256[])"(
      pids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    pendingTokens(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber] & {
        pendingAxial: BigNumber;
        bonusTokenAddress: string;
        bonusTokenSymbol: string;
        pendingBonusToken: BigNumber;
      }
    >;

    "pendingTokens(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber] & {
        pendingAxial: BigNumber;
        bonusTokenAddress: string;
        bonusTokenSymbol: string;
        pendingBonusToken: BigNumber;
      }
    >;

    poolInfo(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, string] & {
        lpToken: string;
        accAxialPerShare: BigNumber;
        lastRewardTimestamp: BigNumber;
        allocPoint: BigNumber;
        rewarder: string;
      }
    >;

    "poolInfo(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, string] & {
        lpToken: string;
        accAxialPerShare: BigNumber;
        lastRewardTimestamp: BigNumber;
        allocPoint: BigNumber;
        rewarder: string;
      }
    >;

    poolLength(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pools: BigNumber }>;

    "poolLength()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pools: BigNumber }>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "set(uint256,uint256,address,bool)"(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalAllocPoint(overrides?: CallOverrides): Promise<[BigNumber]>;

    "totalAllocPoint()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updatePool(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "updatePool(uint256)"(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userInfo(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }
    >;

    "userInfo(uint256,address)"(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }
    >;

    withdraw(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdraw(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  AXIAL(overrides?: CallOverrides): Promise<string>;

  "AXIAL()"(overrides?: CallOverrides): Promise<string>;

  MASTER_CHEF_V2(overrides?: CallOverrides): Promise<string>;

  "MASTER_CHEF_V2()"(overrides?: CallOverrides): Promise<string>;

  MASTER_PID(overrides?: CallOverrides): Promise<BigNumber>;

  "MASTER_PID()"(overrides?: CallOverrides): Promise<BigNumber>;

  add(
    allocPoint: BigNumberish,
    _lpToken: string,
    _rewarder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "add(uint256,address,address)"(
    allocPoint: BigNumberish,
    _lpToken: string,
    _rewarder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  axialPerSec(overrides?: CallOverrides): Promise<BigNumber>;

  "axialPerSec()"(overrides?: CallOverrides): Promise<BigNumber>;

  deposit(
    pid: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deposit(uint256,uint256)"(
    pid: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    pid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "emergencyWithdraw(uint256)"(
    pid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  harvestFromMasterChef(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "harvestFromMasterChef()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  init(
    dummyToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "init(address)"(
    dummyToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  massUpdatePools(
    pids: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "massUpdatePools(uint256[])"(
    pids: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  pendingTokens(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, BigNumber] & {
      pendingAxial: BigNumber;
      bonusTokenAddress: string;
      bonusTokenSymbol: string;
      pendingBonusToken: BigNumber;
    }
  >;

  "pendingTokens(uint256,address)"(
    _pid: BigNumberish,
    _user: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, BigNumber] & {
      pendingAxial: BigNumber;
      bonusTokenAddress: string;
      bonusTokenSymbol: string;
      pendingBonusToken: BigNumber;
    }
  >;

  poolInfo(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber, string] & {
      lpToken: string;
      accAxialPerShare: BigNumber;
      lastRewardTimestamp: BigNumber;
      allocPoint: BigNumber;
      rewarder: string;
    }
  >;

  "poolInfo(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber, string] & {
      lpToken: string;
      accAxialPerShare: BigNumber;
      lastRewardTimestamp: BigNumber;
      allocPoint: BigNumber;
      rewarder: string;
    }
  >;

  poolLength(overrides?: CallOverrides): Promise<BigNumber>;

  "poolLength()"(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  set(
    _pid: BigNumberish,
    _allocPoint: BigNumberish,
    _rewarder: string,
    overwrite: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "set(uint256,uint256,address,bool)"(
    _pid: BigNumberish,
    _allocPoint: BigNumberish,
    _rewarder: string,
    overwrite: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

  "totalAllocPoint()"(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updatePool(
    pid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "updatePool(uint256)"(
    pid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userInfo(
    arg0: BigNumberish,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }
  >;

  "userInfo(uint256,address)"(
    arg0: BigNumberish,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }
  >;

  withdraw(
    pid: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdraw(uint256,uint256)"(
    pid: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    AXIAL(overrides?: CallOverrides): Promise<string>;

    "AXIAL()"(overrides?: CallOverrides): Promise<string>;

    MASTER_CHEF_V2(overrides?: CallOverrides): Promise<string>;

    "MASTER_CHEF_V2()"(overrides?: CallOverrides): Promise<string>;

    MASTER_PID(overrides?: CallOverrides): Promise<BigNumber>;

    "MASTER_PID()"(overrides?: CallOverrides): Promise<BigNumber>;

    add(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "add(uint256,address,address)"(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    axialPerSec(overrides?: CallOverrides): Promise<BigNumber>;

    "axialPerSec()"(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "deposit(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyWithdraw(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "emergencyWithdraw(uint256)"(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    harvestFromMasterChef(overrides?: CallOverrides): Promise<void>;

    "harvestFromMasterChef()"(overrides?: CallOverrides): Promise<void>;

    init(dummyToken: string, overrides?: CallOverrides): Promise<void>;

    "init(address)"(
      dummyToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    massUpdatePools(
      pids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "massUpdatePools(uint256[])"(
      pids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    pendingTokens(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber] & {
        pendingAxial: BigNumber;
        bonusTokenAddress: string;
        bonusTokenSymbol: string;
        pendingBonusToken: BigNumber;
      }
    >;

    "pendingTokens(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber] & {
        pendingAxial: BigNumber;
        bonusTokenAddress: string;
        bonusTokenSymbol: string;
        pendingBonusToken: BigNumber;
      }
    >;

    poolInfo(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, string] & {
        lpToken: string;
        accAxialPerShare: BigNumber;
        lastRewardTimestamp: BigNumber;
        allocPoint: BigNumber;
        rewarder: string;
      }
    >;

    "poolInfo(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber, string] & {
        lpToken: string;
        accAxialPerShare: BigNumber;
        lastRewardTimestamp: BigNumber;
        allocPoint: BigNumber;
        rewarder: string;
      }
    >;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    "poolLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "set(uint256,uint256,address,bool)"(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

    "totalAllocPoint()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updatePool(pid: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "updatePool(uint256)"(
      pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    userInfo(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }
    >;

    "userInfo(uint256,address)"(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; rewardDebt: BigNumber }
    >;

    withdraw(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdraw(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Add(
      pid: BigNumberish | null,
      allocPoint: null,
      lpToken: string | null,
      rewarder: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, string, string],
      {
        pid: BigNumber;
        allocPoint: BigNumber;
        lpToken: string;
        rewarder: string;
      }
    >;

    Deposit(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; pid: BigNumber; amount: BigNumber }
    >;

    EmergencyWithdraw(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; pid: BigNumber; amount: BigNumber }
    >;

    Harvest(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; pid: BigNumber; amount: BigNumber }
    >;

    Init(): TypedEventFilter<[], {}>;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Set(
      pid: BigNumberish | null,
      allocPoint: null,
      rewarder: string | null,
      overwrite: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, string, boolean],
      {
        pid: BigNumber;
        allocPoint: BigNumber;
        rewarder: string;
        overwrite: boolean;
      }
    >;

    UpdatePool(
      pid: BigNumberish | null,
      lastRewardTimestamp: null,
      lpSupply: null,
      accAxialPerShare: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        pid: BigNumber;
        lastRewardTimestamp: BigNumber;
        lpSupply: BigNumber;
        accAxialPerShare: BigNumber;
      }
    >;

    Withdraw(
      user: string | null,
      pid: BigNumberish | null,
      amount: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; pid: BigNumber; amount: BigNumber }
    >;
  };

  estimateGas: {
    AXIAL(overrides?: CallOverrides): Promise<BigNumber>;

    "AXIAL()"(overrides?: CallOverrides): Promise<BigNumber>;

    MASTER_CHEF_V2(overrides?: CallOverrides): Promise<BigNumber>;

    "MASTER_CHEF_V2()"(overrides?: CallOverrides): Promise<BigNumber>;

    MASTER_PID(overrides?: CallOverrides): Promise<BigNumber>;

    "MASTER_PID()"(overrides?: CallOverrides): Promise<BigNumber>;

    add(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "add(uint256,address,address)"(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    axialPerSec(overrides?: CallOverrides): Promise<BigNumber>;

    "axialPerSec()"(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deposit(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emergencyWithdraw(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "emergencyWithdraw(uint256)"(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    harvestFromMasterChef(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "harvestFromMasterChef()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    init(
      dummyToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "init(address)"(
      dummyToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    massUpdatePools(
      pids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "massUpdatePools(uint256[])"(
      pids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    pendingTokens(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "pendingTokens(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolInfo(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "poolInfo(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    poolLength(overrides?: CallOverrides): Promise<BigNumber>;

    "poolLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "set(uint256,uint256,address,bool)"(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalAllocPoint(overrides?: CallOverrides): Promise<BigNumber>;

    "totalAllocPoint()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updatePool(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "updatePool(uint256)"(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userInfo(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userInfo(uint256,address)"(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdraw(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    AXIAL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "AXIAL()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MASTER_CHEF_V2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MASTER_CHEF_V2()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MASTER_PID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MASTER_PID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    add(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "add(uint256,address,address)"(
      allocPoint: BigNumberish,
      _lpToken: string,
      _rewarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    axialPerSec(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "axialPerSec()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deposit(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "emergencyWithdraw(uint256)"(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    harvestFromMasterChef(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "harvestFromMasterChef()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    init(
      dummyToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "init(address)"(
      dummyToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    massUpdatePools(
      pids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "massUpdatePools(uint256[])"(
      pids: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingTokens(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "pendingTokens(uint256,address)"(
      _pid: BigNumberish,
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolInfo(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "poolInfo(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "poolLength()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    set(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "set(uint256,uint256,address,bool)"(
      _pid: BigNumberish,
      _allocPoint: BigNumberish,
      _rewarder: string,
      overwrite: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalAllocPoint(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalAllocPoint()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updatePool(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "updatePool(uint256)"(
      pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userInfo(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userInfo(uint256,address)"(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256,uint256)"(
      pid: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
