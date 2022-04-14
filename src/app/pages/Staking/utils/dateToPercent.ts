import { add, divide, multiply, subtract } from "precise-math";

export const convertPercentToDaysFromNow = (percent: number) => {
  if (percent <= 1) {
    return 1;
  }
  if (percent <= 25) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      percent,
      [0, 25],
      [1, 7]
    );
  } else if (percent <= 50) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      percent,
      [26, 50],
      [8, 30]
    );
  } else if (percent <= 75) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      percent,
      [51, 75],
      [31, 365]
    );
  } else {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      percent,
      [76, 100],
      [366, 2 * 365]
    );
  }
};
export const convertDaysFromNowToPercentage = (numberOfDaysFromNow: number) => {
  if (numberOfDaysFromNow <= 1) {
    return 0;
  }
  if (numberOfDaysFromNow <= 7) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      numberOfDaysFromNow,
      [1, 7],
      [0, 25]
    );
  } else if (numberOfDaysFromNow <= 30) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      numberOfDaysFromNow,
      [8, 30],
      [26, 50]
    );
  } else if (numberOfDaysFromNow <= 365) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      numberOfDaysFromNow,
      [31, 365],
      [51, 75]
    );
  } else if (numberOfDaysFromNow <= 2 * 365) {
    return findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
      numberOfDaysFromNow,
      [366, 2 * 365],
      [76, 100]
    );
  } else {
    return 100;
  }
};

export const findEquivalentOfANumberFromARangeToANumberFromAnotherRange = (
  number: number,
  fromRange: number[],
  destRange: number[]
) => {
  const percentageOfNumberInFromRange = divide(
    multiply(subtract(number, fromRange[0]), 100),
    subtract(fromRange[fromRange.length - 1], fromRange[0])
  );
  const equivalentNumberInDestRange = multiply(
    divide(percentageOfNumberInFromRange, 100),
    subtract(destRange[destRange.length - 1], destRange[0])
  );
  return +add(destRange[0], equivalentNumberInDestRange).toFixed(0);
};

export const convertNumberOfDaysFromNowToDate = (
  numberOfDaysFromNow: number
) => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = numberOfDaysFromNow * (1000 * 3600 * 24);
  const newDate = new Date(date.getTime() + diff);
  return newDate;
};

export const convertADateInTheFutureToNumberOfDaysFromNow = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffInDays = Math.ceil(divide(diff, 1000 * 3600 * 24));
  return diffInDays;
};
