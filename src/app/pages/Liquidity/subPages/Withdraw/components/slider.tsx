import { Slider, styled } from "@mui/material";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { TypeOfTokensToWithdraw } from "app/pages/Liquidity/types";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WithdrawSlider = () => {
  const dispatch = useDispatch();
  const account = useSelector(Web3Selectors.selectAccount);
  const sliderValue = useSelector(LiquidityPageSelectors.withdrawPercentage);
  const selectedPool = useSelector(LiquidityPageSelectors.selectedPool);
  const userShareData = useSelector(
    RewardsSelectors.userShareData(selectedPool?.key)
  );
  const selectedToken = useSelector(
    LiquidityPageSelectors.selectedTokenToWithdraw
  );
  const handleSliderChange = (e: number) => {
    dispatch(LiquidityPageActions.setWithdrawPercentage(e));
  };
  return (
    <StyledSlider
      value={sliderValue}
      disabled={
        !account ||
        !userShareData ||
        selectedToken === TypeOfTokensToWithdraw.Mixed
      }
      onChange={(e, value) => {
        handleSliderChange(value as number);
      }}
      aria-label="Default"
      valueLabelDisplay="auto"
    />
  );
};

const StyledSlider = styled(Slider)({
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
