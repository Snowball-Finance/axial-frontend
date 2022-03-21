import { globalSelectors } from "app/appSelectors";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { RewardsActions } from "app/containers/Rewards/slice";
import { Pools, WithdrawType } from "app/containers/Rewards/types";
import { TokenSymbols } from "app/containers/Swap/types";
import { tokens } from "app/tokens";
import { floatToBN } from "common/format";
import { BigNumber } from "ethers";
import { useDispatch, useSelector } from "react-redux";

export const Playground = () => {
  const dispatch = useDispatch();
  const handleDepositIntoAM3DStablecoinsButtonClicked = () => {
    dispatch(
      RewardsActions.approveAndDeposit({
        poolName: Pools.AXIAL_AM3D,
        tokenAmounts: {
          [TokenSymbols.MIM]: floatToBN(0.1, tokens[TokenSymbols.MIM].decimals),
          [TokenSymbols.USDCe]: floatToBN(
            0.1,
            tokens[TokenSymbols.USDCe].decimals
          ),
          [TokenSymbols.DAI]: floatToBN(0.1, tokens[TokenSymbols.DAI].decimals),
        },
      })
    );
  };

  const handlewithMasterchefClicked = () => {
    dispatch(
      RewardsActions.approveAndDeposit({
        poolName: Pools.AXIAL_AM3D,
        masterchefDeposit: true,
        tokenAmounts: {
          [TokenSymbols.am3dUSD]: floatToBN(
            0.1,
            tokens[TokenSymbols.am3dUSD].decimals
          ),
        },
      })
    );
  };
  const handleWithdrawStableCoins = () => {
    dispatch(
      RewardsActions.approveAndWithdraw({
        poolName: Pools.AXIAL_AM3D,
        type: WithdrawType.ALL,
        lpTokenAmountToSpend:
          floatToBN(0.1, tokens[TokenSymbols.MIM].decimals) ||
          BigNumber.from("0"),
        tokenAmounts: {
          [TokenSymbols.MIM]: floatToBN(0.1, tokens[TokenSymbols.MIM].decimals),
          [TokenSymbols.USDCe]: floatToBN(
            0.1,
            tokens[TokenSymbols.USDCe].decimals
          ),
          [TokenSymbols.DAI]: floatToBN(0.1, tokens[TokenSymbols.DAI].decimals),
        },
      })
    );
  };
  const tokensInQueue = useSelector(RewardsSelectors.tokensInQueueToApprove);
  return (
    <>
      <ContainedButton onClick={handleDepositIntoAM3DStablecoinsButtonClicked}>
        deposit into AM3D Stablecoins
      </ContainedButton>
      <ContainedButton onClick={handlewithMasterchefClicked}>
        deposit AXIAL_AM3D
      </ContainedButton>
      <ContainedButton onClick={handleWithdrawStableCoins}>
        withdraw AM3D Stablecoins
      </ContainedButton>
      <ul>
        {Object.keys(tokensInQueue).map((tokenSymbol) => {
          return (
            <li style={{ color: "white" }} key={tokenSymbol}>
              {tokenSymbol}
              {tokensInQueue[tokenSymbol].toString()}{" "}
            </li>
          );
        })}
      </ul>
    </>
  );
};
