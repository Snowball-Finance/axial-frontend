import { getDayOffset, getEpochSecondForDay } from "./date";

const WEEK = 7 * 86400;
const MAXTIME = 2 * 365 * 86400;

export const estimateGovernanceTokenForDate = (amount, unlockDate) => {
  const rounded = Math.floor(getEpochSecondForDay(unlockDate) / WEEK) * WEEK;
  return ((rounded - +new Date() / 1000) / MAXTIME) * amount;
};

export const estimateGovernanceTokenForPeriod = (amount, period) => {
  return estimateGovernanceTokenForDate(
    amount,
    getDayOffset(new Date(), period / 86400)
  );
};

export const roundDateByGovernanceTokenEpochSeconds = (date) => {
  return Math.floor(getEpochSecondForDay(date) / WEEK) * WEEK;
};

export const roundDateByGovernanceTokenEpoch = (date) => {
  return new Date(Math.floor(getEpochSecondForDay(date) / WEEK) * WEEK * 1000);
};
