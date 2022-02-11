import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { DepositAndWithdrawBody } from "./components/body";
import { StakingTabs } from "./components/tabs";

export const DepositAndWithdraw = () => {
  return (
    <StyledSnowPaper>
      <StakingTabs />
      <DepositAndWithdrawBody />
    </StyledSnowPaper>
  );
};

const StyledSnowPaper = styled(SnowPaper)({
  padding: "24px 32px",
  position: "relative",
  maxWidth: "490px",
  flex: 1,
});
