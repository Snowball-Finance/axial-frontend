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
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { StakingPageActions } from "../../../../slice";
import { DepositAndWithdrawTab } from "../../../../types";
import { Info } from "./info";

export const OverallInfoCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lockedGovernanceTokenInfo = useSelector(
    StakingSelectors.lockedGovernanceTokenInfo
  );
  const rawLockedTokenAmount = lockedGovernanceTokenInfo?.startingAmountLocked;
  const lockedTokenAmount = BNToFloat(
    rawLockedTokenAmount || BigNumber.from(0),
    18
  )?.toFixed(3);
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const unlockedAxialAmount = BNToFloat(
    rawClaimableAxial ?? BigNumber.from(0),
    18
  )?.toFixed(3);
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
    setTimeout(() => {
      document.getElementById("stakeButton")?.scrollIntoView();
    }, 0);
  };

  return (
    <Wrapper>
      <Title>
        {t(translations.Staking.StakingPageFirstDescTitle_MAINTOKENNAME(), {
          mainTokenName: env.MAIN_TOKEN_NAME,
        })}
      </Title>
      <StyledSnowPaper>
        <LeftWrapper>
          <Info
            title={t(translations.Staking.TokensLocked())}
            value={`${lockedTokenAmount} ${env.MAIN_TOKEN_NAME}`}
            // help={<>info</>}
          />
          <Info
            title={t(translations.Staking.GOVERNANCETOKENNAME_Balance(), {
              governanceTokenName: env.GOVERNANCE_TOKEN_NAME,
            })}
            value={`${governanceTokenBalance} ${env.GOVERNANCE_TOKEN_NAME}`}
            // help={<>info</>}
          />
          <Filler />
          <OutlinedButton>
            {t(translations.Staking.HowItWorks())}
          </OutlinedButton>
        </LeftWrapper>
        <RightWrapper>
          <Info
            title={t(translations.Staking.MAIN_TOKEN_NAME_Unlocked(), {
              mainTokenName: env.MAIN_TOKEN_NAME,
            })}
            value={`${unlockedAxialAmount}`}
          />
          <Filler />
          <ContainedButton onClick={handleStakeClick}>
            {t(translations.Staking.Stake_MAINTOKENNAME(), {
              mainTokenName: env.MAIN_TOKEN_NAME,
            })}
          </ContainedButton>
        </RightWrapper>
      </StyledSnowPaper>
      <Desc>
        {t(translations.Staking.StakingPageFirstDesc(), {
          mainTokenName: env.MAIN_TOKEN_NAME,
          governanceTokenName: env.GOVERNANCE_TOKEN_NAME,
        })}
      </Desc>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  maxWidth: "560px",
});

const Desc = styled("div")({
  fontSize: "18px",
  fontWeight: 400,
  color: CssVariables.commonTextColor,
});

const Title = styled("h1")({
  fontSize: "26px",
  fontWeight: 700,
  margin: 0,
  color: CssVariables.commonTextColor,
  marginBottom: "20px",
});

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
  border: `4px solid ${CssVariables.cardBorder}`,
  [mobile]: {
    maxWidth: "unset",
    width: "100%",
  },
});
