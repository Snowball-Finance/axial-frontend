import { BigNumber } from "ethers";

export interface FarmDataType {

  name: string;
  tokens: {
    icon: string;
    name: string;
    symbol: string;
    value: string;
  }[];
  reserve: string;
  isPaused?: boolean

}
export interface FarmDataRowType {
  title: string,
  value: string,
  sub?: string
}