import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFloat } from "common/format";
import { env } from "environment";
import { BigNumber } from "ethers";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { StakingPageActions } from "../../slice";
import { DepositAndWithdrawTab } from "../../types";
import { Info } from "./info";

export const OverallInfoCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rawLockedTokenAmount = useSelector(
    StakingSelectors.selectLockedGovernanceTokenAmount
  );
  const lockedTokenAmount = BNToFloat(rawLockedTokenAmount, 18)?.toFixed(3);

  const earnedTokensAmount = "0.00";
  const dailyUnlockedAmount = "0.00";
  const rawGovernanceTokenBalance = useSelector(
    GovernanceSelectors.selectGovernanceTokenBalance
  );
  const governanceTokenBalance = BNToFloat(
    rawGovernanceTokenBalance ?? BigNumber.from(0),
    18
  )?.toFixed(3);

  const handleStakeClick = () => {
    dispatch(
      StakingPageActions.setSelectedDepositAndWithdrawTab(
        DepositAndWithdrawTab.Deposit
      )
    );
  };

  return (
    <StyledSnowPaper>
      <LeftWrapper>
        <Info
          title={t(translations.Staking.TokensLocked())}
          value={`${lockedTokenAmount} ${env.MAIN_TOKEN_NAME}`}
          help={<>info</>}
        />
        <Info
          title={t(translations.Staking.GOVERNANCETOKENNAME_Balance(), {
            governanceTokenName: env.GOVERNANCE_TOKEN_NAME,
          })}
          value={`${governanceTokenBalance} ${env.GOVERNANCE_TOKEN_NAME}`}
          help={<>info</>}
        />
        <Filler />

        <OutlinedButton>{t(translations.Staking.HowItWorks())}</OutlinedButton>
      </LeftWrapper>
      <RightWrapper>
        <Info
          title={t(translations.Staking.TokensEarned())}
          value={`${earnedTokensAmount} ${env.MAIN_TOKEN_NAME}`}
        />
        <Info
          title={t(translations.Staking.DailyUnlocked())}
          value={`${dailyUnlockedAmount} ${env.MAIN_TOKEN_NAME}`}
        />
        <Filler />
        <ContainedButton onClick={handleStakeClick}>
          {t(translations.Staking.Stake_MAINTOKENNAME(), {
            mainTokenName: env.MAIN_TOKEN_NAME,
          })}
        </ContainedButton>
      </RightWrapper>
    </StyledSnowPaper>
  );
};

const Filler = styled("div")({
  flex: 1,
});

const LeftWrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});
const RightWrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});
const StyledSnowPaper = styled(SnowPaper)({
  padding: "24px 32px",
  position: "relative",
  maxWidth: "490px",
  display: "flex",
  gap: "12px",
  flex: 1,
});
