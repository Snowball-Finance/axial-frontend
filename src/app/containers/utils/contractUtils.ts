import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { BigNumber, Contract, ContractInterface } from "ethers";
import { AddressZero } from "@ethersproject/constants";
import { getAddress } from "@ethersproject/address";
import { PoolTypes } from "app/constants";
import { formatUnits } from "@ethersproject/units";
import { parseUnits } from "ethers/lib/utils";
import { Zero } from "app/containers/Rewards/constants";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
export function getTokenSymbolForPoolType(poolType: PoolTypes): string {
  if (poolType === PoolTypes.BTC) {
    return "WBTC";
  } else if (poolType === PoolTypes.ETH) {
    return "WETH";
  } else if (poolType === PoolTypes.USD) {
    return "USDC";
  } else {
    return "";
  }
}
export function formatBNToPercentString(
  bn: BigNumber,
  nativePrecison: number,
  decimalPlaces = 2
): string {
  return `${formatBNToString(bn, nativePrecison - 2, decimalPlaces)}%`;
}

export function formatBNToString(
  bn: BigNumber,
  nativePrecison: number,
  decimalPlaces?: number
): string {
  const fullPrecision = formatUnits(bn, nativePrecison);
  const decimalIdx = fullPrecision.indexOf(".");
  return decimalPlaces === undefined || decimalIdx === -1
    ? fullPrecision
    : fullPrecision.slice(
        0,
        decimalIdx + (decimalPlaces > 0 ? decimalPlaces + 1 : 0) // don't include decimal point if places = 0
      );
}

export function calculatePrice(
  amount: BigNumber | string,
  tokenPrice = 0,
  decimals?: number
): BigNumber {
  // returns amount * price as BN 18 precision
  if (typeof amount === "string") {
    if (isNaN(+amount)) return Zero;
    return parseUnits((+amount * tokenPrice).toFixed(2), 18);
  } else if (decimals != null) {
    return amount
      .mul(parseUnits(tokenPrice.toFixed(2), 18))
      .div(BigNumber.from(10).pow(decimals));
  }
  return Zero;
}

export function calculateExchangeRate(
  amountFrom: BigNumber,
  tokenPrecisionFrom: number,
  amountTo: BigNumber,
  tokenPrecisionTo: number
): BigNumber {
  return amountFrom.gt("0")
    ? amountTo
        .mul(BigNumber.from(10).pow(36 - tokenPrecisionTo)) // convert to standard 1e18 precision
        .div(amountFrom.mul(BigNumber.from(10).pow(18 - tokenPrecisionFrom)))
    : BigNumber.from("0");
}

export function shiftBNDecimals(bn: BigNumber, shiftAmount: number): BigNumber {
  if (shiftAmount < 0) throw new Error("shiftAmount must be positive");
  return bn.mul(BigNumber.from(10).pow(shiftAmount));
}
