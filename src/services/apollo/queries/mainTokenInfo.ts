import { gql } from "@apollo/client";

export const INFO_QUERY = `
{
  LastSnowballInfo{
    createdAt
    snowballTVL
    blocksPast24hrs
    snowballTVL
    snobPerBlock
    blockHeight
    snobNextPhase
    snowballToken {
      supply
      totalSupply
      pangolinPrice
    }
    poolsInfo{
      address
      lpAddress
      name
      kind
      source
      symbol
      tvlStaked
      dailyAPR
      dailyAPY
      weeklyAPY
      yearlyAPY
      pricePoolToken
      deprecated
      token0{
        address
        name
        symbol
        pangolinPrice
        supply
        decimals
      }
      token1{
        address
        name
        symbol
        pangolinPrice
        supply
        decimals
      }
      token2{
        address
        name
        symbol
        pangolinPrice
        supply
        decimals
      }
      token3{
        address
        name
        symbol
        pangolinPrice
        supply
        decimals
      }
      gaugeInfo{
        address
        tvlStaked
        snobDailyAPR
        snobWeeklyAPR
        snobYearlyAPR
        fullDailyAPY
        fullWeeklyAPY
        fullYearlyAPY
        snobAllocation
      }
    }
  }
}
`;

export const LAST_MAIN_TOKEN_INFO = gql`
  query ${INFO_QUERY}
`;
export const GET_TVL_INFO_LAST_MAIN_TOKEN = gql`
  query {
    LastSnowballInfo {
      createdAt
      snowballTVL
      blocksPast24hrs
      snowballTVL
      snobPerBlock
      blockHeight
      snobNextPhase
      snowballToken {
        supply
        totalSupply
        pangolinPrice
      }
    }
  }
`;
