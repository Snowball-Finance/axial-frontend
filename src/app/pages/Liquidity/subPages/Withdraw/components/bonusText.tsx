import { RewardsSelectors } from "app/containers/Rewards/selectors"
import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact"
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors"
import { useSelector } from "react-redux"

export const BonusText=()=>{
  // const pool=useSelector(LiquidityPageSelectors.selectedPool)
  // const pools=useSelector(RewardsSelectors.pools)
  // const poolData=pools[pool?.]
  // const percentage=      calculatePriceImpact(
  //   withdrawLPTokenAmount,
  //   tokenInputSum,
  //   poolData.virtualPrice,
  //   true,
  // ),
  return <></>
}