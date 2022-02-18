/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { SynthetixExchangeRate } from "../SynthetixExchangeRate";

export class SynthetixExchangeRate__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SynthetixExchangeRate {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SynthetixExchangeRate;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "address",
        name: "_resolver",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "_currencyKeys",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[]",
        name: "_newRates",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "aggregator",
        type: "address",
      },
    ],
    name: "AggregatorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "aggregator",
        type: "address",
      },
    ],
    name: "AggregatorRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "CacheUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "entryPoint",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "upperLimit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lowerLimit",
        type: "uint256",
      },
    ],
    name: "InversePriceConfigured",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "initiator",
        type: "address",
      },
    ],
    name: "InversePriceFrozen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOracle",
        type: "address",
      },
    ],
    name: "OracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerNominated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "RateDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "currencyKeys",
        type: "bytes32[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "newRates",
        type: "uint256[]",
      },
    ],
    name: "RatesUpdated",
    type: "event",
  },
  {
    constant: false,
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "aggregatorAddress",
        type: "address",
      },
    ],
    name: "addAggregator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "aggregatorKeys",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "aggregatorWarningFlags",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "aggregators",
    outputs: [
      {
        internalType: "contract AggregatorV2V3Interface",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32[]",
        name: "currencyKeys",
        type: "bytes32[]",
      },
    ],
    name: "anyRateIsInvalid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "canFreezeRate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "aggregator",
        type: "address",
      },
    ],
    name: "currenciesUsingAggregator",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "currencies",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "currencyKeyDecimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "currentRoundForRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "deleteRate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "sourceAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
    ],
    name: "effectiveValue",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "sourceAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
    ],
    name: "effectiveValueAndRates",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sourceRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "destinationRate",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "sourceAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "roundIdForSrc",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roundIdForDest",
        type: "uint256",
      },
    ],
    name: "effectiveValueAtRound",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "freezeRate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "getCurrentRoundId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "startingRoundId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startingTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timediff",
        type: "uint256",
      },
    ],
    name: "getLastRoundIdBeforeElapsedSecs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "inversePricing",
    outputs: [
      {
        internalType: "uint256",
        name: "entryPoint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "upperLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lowerLimit",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "frozenAtUpperLimit",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "frozenAtLowerLimit",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "invertedKeys",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isResolverCached",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "lastRateUpdateTimes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32[]",
        name: "currencyKeys",
        type: "bytes32[]",
      },
    ],
    name: "lastRateUpdateTimesForCurrencies",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "nominateNewOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "nominatedOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateAndInvalid",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isInvalid",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "rateAndTimestampAtRound",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateAndUpdatedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateForCurrency",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateIsFlagged",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateIsFrozen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateIsInvalid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "rateIsStale",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "rateStalePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32[]",
        name: "currencyKeys",
        type: "bytes32[]",
      },
    ],
    name: "ratesAndInvalidForCurrencies",
    outputs: [
      {
        internalType: "uint256[]",
        name: "rates",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "anyRateInvalid",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "numRounds",
        type: "uint256",
      },
    ],
    name: "ratesAndUpdatedTimeForCurrencyLastNRounds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "rates",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "times",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32[]",
        name: "currencyKeys",
        type: "bytes32[]",
      },
    ],
    name: "ratesForCurrencies",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "rebuildCache",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "removeAggregator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "removeInversePricing",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "resolver",
    outputs: [
      {
        internalType: "contract AddressResolver",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "resolverAddressesRequired",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "addresses",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "roundFrozen",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "entryPoint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "upperLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lowerLimit",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "freezeAtUpperLimit",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "freezeAtLowerLimit",
        type: "bool",
      },
    ],
    name: "setInversePricing",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "setOracle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32[]",
        name: "currencyKeys",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[]",
        name: "newRates",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "timeSent",
        type: "uint256",
      },
    ],
    name: "updateRates",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
