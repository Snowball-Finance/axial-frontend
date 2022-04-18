import { env } from "environment";

export const isInvalidPeriod = (value: string | any) => {
  return (
    value === "" ||
    value.includes("e") ||
    value.includes(".") ||
    Number(value) > Number(env.MAXIMUM_VOTING_PERIOD) ||
    Number(value) < Number(env.MINIMUM_VOTING_PERIOD)
  );
};
