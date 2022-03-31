import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { PoolData, UserShareData } from "app/containers/Rewards/types";
import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";

export const BonusText = () => {
  const pool = useSelector(LiquidityPageSelectors.selectedPool);
  const pools = useSelector(RewardsSelectors.pools);
  let poolData: PoolData | undefined = undefined;
  let userShareData: UserShareData | undefined = undefined;
  let tokenInputSum = BigNumber.from(0);
  if (pool && pools[pool.key]) {
    poolData = pools[pool.key]?.poolData;
    userShareData = pools[pool.key]?.userShareData;
    tokenInputSum =
      userShareData?.masterchefBalance?.userInfo.amount ?? BigNumber.from("0");
  }

  let percentage = BigNumber.from(0);
  if (poolData) {
    percentage = calculatePriceImpact(
      tokenInputSum,
      tokenInputSum,
      poolData.virtualPrice,
      true
    );
  }
  return <>{percentage.toString()}</>;
};
