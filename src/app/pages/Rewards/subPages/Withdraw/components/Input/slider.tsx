import { Slider, styled } from "@mui/material";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { BNToFloat } from "common/format";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const RewardsWithdrawSlider = () => {
  const dispatch = useDispatch();
  const sliderValue = useSelector(RewardsPageSelectors.withdrawPercentage);
  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const balances = useSelector(RewardsSelectors.poolsBalances);
  const account = useSelector(Web3Selectors.selectAccount);
  let symbol = pool?.lpToken.symbol || "";

  const handleSliderChange = (e: number) => {
    if (balances && pool) {
      const balance = balances[symbol]?.userInfo.amount;
      dispatch(
        RewardsPageActions.setWithdrawPercentage({
          percent: e,
          balance: BNToFloat(balance, pool.lpToken.decimals) || 0,
        })
      );
    }
  };
  // const verySmall=balances && balances[symbol]?.userInfo.amount.lte(100)
  return (
    <WithdrawSlider
      disabled={
        !account || !balances || (pool && balances[symbol]?.userInfo.amount.eq(0))//||verySmall
      }
      onChange={(e, v) => {
        handleSliderChange(v as number);
      }}
      value={sliderValue}
      aria-label="Default"
      valueLabelDisplay="auto"
    />
  );
};

const WithdrawSlider = styled(Slider)({
  color: CssVariables.green,
  height: 10,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: CssVariables.green,
    border: `2px solid ${CssVariables.green}`,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: CssVariables.green,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
