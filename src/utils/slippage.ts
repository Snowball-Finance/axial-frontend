import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { parseUnits } from "ethers/lib/utils";

export enum Slippages {
  One = "ONE",
  OneTenth = "ONE_TENTH",
  Custom = "CUSTOM",
}

export interface NumberInputState {
  isEmpty: boolean;
  isValid: boolean;
  precision: number;
  valueRaw: string;
  valueSafe: string; // represents a BigNumber
}

/**
 * Given an input value and slippage redux state values, do the math.
 * @param {BigNumber} inputValue
 * @param {Slippages} slippageSelected
 * @param {NumberInputState} slippageCustom
 * @param {boolean} add
 * @return {BigNumber}
 */
export function _applySlippage(
  inputValue: BigNumber,
  slippageSelected: Slippages,
  slippageCustom?: NumberInputState,
  add = false
): BigNumber {
  let numerator;
  let denominator;
  if (slippageSelected === Slippages.Custom && !!slippageCustom) {
    denominator = BigNumber.from(10).pow(slippageCustom.precision + 2);
    numerator = add
      ? denominator.add(slippageCustom.valueSafe)
      : denominator.sub(slippageCustom.valueSafe);
  } else if (slippageSelected === Slippages.OneTenth) {
    denominator = 1000;
    numerator = denominator + (add ? 1 : -1);
  } else {
    // default to 1%
    denominator = 100;
    numerator = denominator + (add ? 1 : -1);
  }
  return (inputValue || BigNumber.from(0)).mul(numerator).div(denominator);
}

export function addSlippage(
  inputValue: BigNumber,
  slippageSelected: Slippages,
  slippageCustom?: NumberInputState
): BigNumber {
  return _applySlippage(inputValue, slippageSelected, slippageCustom, true);
}

export function subtractSlippage(
  inputValue: BigNumber,
  slippageSelected: Slippages,
  slippageCustom?: NumberInputState
): BigNumber {
  return _applySlippage(inputValue, slippageSelected, slippageCustom, false);
}

export function formatSlippageToString(
  slippageSelected: Slippages,
  slippageCustom?: NumberInputState
): string {
  if (slippageSelected === Slippages.Custom && !!slippageCustom) {
    return formatUnits(slippageCustom.valueSafe, slippageCustom?.precision);
  } else if (slippageSelected === Slippages.OneTenth) {
    return formatUnits(BigNumber.from(100), 3);
  } else if (slippageSelected === Slippages.One) {
    return formatUnits(BigNumber.from(100), 2);
  } else {
    return "N/A";
  }
}
export const slippageCustomStateCreator = numberInputStateCreator(
  4,
  BigNumber.from(10).pow(4).mul(1)
);
/**
 * A curried function for representing user inputted number values.
 * Can be used to show errors in the UI, as well as safely interacting with the blockchain
 * @param {number} precision
 * @param {BigNumber} fallback
 * @return {function}
 */
export function numberInputStateCreator(
  precision: number,
  fallback: BigNumber
) {
  /**
   * Transforms a user inputted string into a more verbose format including BigNumber representation
   * @param {string} inputValue
   * @return {NumberInputState}
   */
  return function createNumberInputState(
    inputValue: string | BigNumber
  ): NumberInputState {
    if (BigNumber.isBigNumber(inputValue)) {
      return {
        isEmpty: false,
        isValid: true,
        precision,
        valueRaw: formatUnits(inputValue, precision),
        valueSafe: inputValue.toString(),
      };
    } else {
      const { value: valueSafe, isFallback } = parseStringToBigNumber(
        inputValue,
        precision,
        fallback
      );
      return {
        isEmpty: inputValue === "",
        isValid: !isFallback,
        precision,
        valueRaw: inputValue,
        valueSafe: valueSafe.toString(),
      };
    }
  };
}
/**
 * Parses a user input string into a BigNumber.
 * Uses the native precision of the token if a tokenSymbol is provided
 * Defaults to a value of 0 if string cannot be parsed
 *
 * @param {string} valueRaw
 * @param {number} precision
 * @param {BigNumber} fallback
 * @return {Object} result
 * @return {BigNumber} result.value
 * @return {boolean} result.isFallback
 * }
 */
export default function parseStringToBigNumber(
  valueRaw: string,
  precision: number,
  fallback?: BigNumber
): { value: BigNumber; isFallback: boolean } {
  let valueSafe: BigNumber;
  let isFallback: boolean;
  try {
    // attempt to parse string. Use fallback value if library error is thrown
    valueSafe = parseUnits(valueRaw, precision);
    isFallback = false;
  } catch {
    valueSafe = fallback ?? BigNumber.from("0");
    isFallback = true;
  }
  return { value: valueSafe, isFallback };
}
