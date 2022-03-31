import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { PoolData } from "app/containers/Rewards/types";
import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";

export const BonusText = () => {
  const pool = useSelector(LiquidityPageSelectors.selectedPool);
  const pools = useSelector(RewardsSelectors.pools);
  let poolData: PoolData | undefined = undefined;
  if (pool && pools[pool.key]) {
    poolData = pools[pool.key]?.poolData;
  }
  const withdrawAmounts = useSelector(
    LiquidityPageSelectors.withdrawTokenAmounts
  );
  let sum = 0;
  for (let k in withdrawAmounts) {
    const v = withdrawAmounts[k];
    if (Number(v) > 0) {
      sum += Number(v);
    }
  }
  const BNSum = BigNumber.from(sum.toString());

  let percentage = BigNumber.from(0);
  if (poolData) {
    percentage = calculatePriceImpact(
      //ToDO: fix next line
      // withdrawLPTokenAmount,
      BigNumber.from(0),
      BNSum,
      poolData.virtualPrice,
      true
    );
  }
  return <>{percentage}</>;
};
