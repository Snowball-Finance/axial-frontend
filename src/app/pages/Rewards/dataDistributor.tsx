import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RewardsPageSelectors } from "./selectors";
import { RewardsPageActions } from "./slice";

export const DataDistributor = () => {
  const dispatch = useDispatch();
  const networkLibrary = useSelector(Web3Selectors.selectNetworkLibrary);
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const aprData = useSelector(RewardsSelectors.aprData);
  const poolsBalances = useSelector(RewardsSelectors.poolsBalances);
  useEffect(() => {
    if (networkLibrary && selectedPool) {
      dispatch(RewardsPageActions.getRewardPoolData());
    }
    return () => {};
  }, [aprData, poolsBalances, networkLibrary]);
  return <></>;
};
