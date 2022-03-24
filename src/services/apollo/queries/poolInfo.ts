const POOLS_INFO_BY_ADDRESS = `
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
`;
export { POOLS_INFO_BY_ADDRESS };
