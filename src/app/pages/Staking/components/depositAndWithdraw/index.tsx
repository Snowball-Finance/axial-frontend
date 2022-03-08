import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
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
  padding: "24px 0px",
  position: "relative",
  maxWidth: "490px",
  flex: 1,
  border: `4px solid ${CssVariables.cardBorder}`,
  [mobile]: {
    maxWidth: "unset",
    width: "100%",
  },
});
