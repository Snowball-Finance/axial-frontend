import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { BNToFractionString } from "common/format";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { Info } from "./info";

export const OverallInfoCard = () => {
  const { t } = useTranslation();
  const lockedGovernanceTokenInfo = useSelector(
    StakingSelectors.lockedGovernanceTokenInfo
  );
  const rawLockedTokenAmount = lockedGovernanceTokenInfo?.startingAmountLocked;
  const lockedTokenAmount = BNToFractionString(rawLockedTokenAmount);
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const unlockedAxialAmount = BNToFractionString(rawClaimableAxial);
  const rawGovernanceTokenBalance = useSelector(
    GovernanceSelectors.governanceTokenBalance
  );
  const lockEndDate = useSelector(StakingPageSelectors.lockEndDate);
  const governanceTokenBalance = BNToFractionString(rawGovernanceTokenBalance);

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
        </LeftWrapper>
        <RightWrapper>
          <Info
            title={t(translations.Staking.MAIN_TOKEN_NAME_Unlocked(), {
              mainTokenName: env.MAIN_TOKEN_NAME,
            })}
            value={`${unlockedAxialAmount}`}
          />
          {lockEndDate && (
            <Info
              title={t(translations.Staking.LockEnd())}
              value={`${lockEndDate}`}
              // help={<>info</>}
            />
          )}
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
