import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { Pool } from "app/containers/Rewards/types";
import { pools } from "app/pools";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getKeyFromPoolIndex } from "./constants";
import { RewardsPageSelectors } from "./selectors";
import { RewardsPageActions } from "./slice";

type TParams = { poolIndex: string };

export const DataDistributor = () => {
  const dispatch = useDispatch();
  const { poolIndex } = useParams<TParams>();

  const networkLibrary = useSelector(Web3Selectors.selectNetworkLibrary);
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const aprData = useSelector(RewardsSelectors.aprData);
  const poolsBalances = useSelector(RewardsSelectors.poolsBalances);
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  useEffect(() => {
    if (poolKey) {
      const pool = pools[poolKey] as Pool;
      dispatch(RewardsPageActions.setSelectedPool(pool));
    }
  }, [poolKey]);

  useEffect(() => {
    if (networkLibrary && selectedPool) {
      dispatch(RewardsPageActions.getRewardPoolData());
    }
    return () => {};
  }, [aprData, poolsBalances, networkLibrary]);
  return <></>;
};
