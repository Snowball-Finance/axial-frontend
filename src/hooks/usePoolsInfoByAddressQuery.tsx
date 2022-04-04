// @ts-nocheck
import { gql, useQuery, QueryResult, OperationVariables } from "@apollo/client"

interface PoolsInfoByAddressVars {
  address: string
}

interface GaugeInfoQuery {
  snobYearlyAPR: number
}

interface PoolsInfoByAddress {
  address: string
  name: string
  yearlyAPY: number
  yearlySwapFees: number
  gaugeInfo: GaugeInfoQuery
}

export interface PoolsInfoByAddressQueryResponse {
  PoolsInfoByAddress: PoolsInfoByAddress
}

const POOLS_INFO_BY_ADDRESS = gql`
  query poolsInfoByAddress($address: String) {
    PoolsInfoByAddress(address: $address) {
      address
      name
      yearlyAPY
      yearlySwapFees
      gaugeInfo {
        snobYearlyAPR
      }
    }
  }
`

export function usePoolsInfoByAddressQuery(
  address: string,
): QueryResult<PoolsInfoByAddressQueryResponse, OperationVariables> {
  return useQuery<PoolsInfoByAddressQueryResponse, PoolsInfoByAddressVars>(
    POOLS_INFO_BY_ADDRESS,
    {
      variables: { address },
    },
  )
}
