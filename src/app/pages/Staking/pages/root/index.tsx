import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { Max1040 } from "app/components/wrappers/max1040";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import sAxialIcon from "assets/icons/saxial.png";
import veAxialIcon from "assets/icons/veaxial.png";
import { StakingSubPages } from "../../routes";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { FC } from "react";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFractionString } from "common/format";
import { StakingPageSelectors } from "../../selectors";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";

interface InfoProps {
  title: string;
  value: string;
}
const Info: FC<InfoProps> = ({ title, value }) => {
  return (
    <InfoWrapper>
      <InfoTitle>{title}</InfoTitle>
      <InfoValue>{value}</InfoValue>
    </InfoWrapper>
  );
};
const InfoTitle = styled("span")({
  color: CssVariables.commonTextColor,
  fontFamily: FontFamilies.IBMPlexSans,
  fontWeight: 700,
  fontSize: "16px",
});
const InfoValue = styled("span")({
  color: CssVariables.commonTextColor,
  fontFamily: FontFamilies.IBMPlexSans,
  fontSize: "16px",
});
const InfoWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
});

export const StakingRoot = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lockedGovernanceTokenInfo = useSelector(
    StakingSelectors.lockedGovernanceTokenInfo
  );
  const rawLockedTokenAmount = lockedGovernanceTokenInfo?.startingAmountLocked;
  const lockedTokenAmount = BNToFractionString(rawLockedTokenAmount);
  const rawClaimableAxial = useSelector(
    StakingSelectors.claimableGovernanceToken
  );
  const unlockedAxialAmount = BNToFractionString(rawClaimableAxial);
  const lockEndDate = useSelector(StakingPageSelectors.lockEndDate);

  const rawVeAxialBalance = useSelector(
    GovernanceSelectors.accruingTokenBalance
  );
  const rawAxialStakedIntoVeAxial = useSelector(
    GovernanceSelectors.mainTokenAmountStakedForAccruing
  );
  const veAxialBalance = BNToFractionString(rawVeAxialBalance);
  const stakedAxialIntoVeAxial = BNToFractionString(rawAxialStakedIntoVeAxial);
  const isWithdrawingGovernanceToken = useSelector(
    StakingSelectors.selectIsWithdrawing
  );

  const isWithdrawingAccruingToken = useSelector(
    StakingSelectors.isWithdrawingAccruingToken
  );

  const withdrawSAxial = () => {
    dispatch(StakingActions.withdrawGovernanceToken());
  };
  const withdrawVeAxial = () => {
    dispatch(StakingActions.withdrawAccruingToken());
  };

  const goToSAxial = () => {
    dispatch(push(StakingSubPages.sAxial));
  };

  const goToVeAxial = () => {
    dispatch(push(StakingSubPages.veAxial));
  };

  return (
    <Wrapper>
      <StyledSnowPaper>
        <IconWrapper>
          <StyledIcon src={sAxialIcon} />
          <TokenTitle>sAxial</TokenTitle>
        </IconWrapper>
        <Desc>{t(translations.Staking.StakingRootsaxialDescs())}</Desc>
        <InfosWrapper>
          <Info title="sAXIAL" value={lockedTokenAmount || "0.000"} />
          <Info title="AXIAL Unlocked" value={unlockedAxialAmount || "0.000"} />
          {lockEndDate && <Info title="Lock End" value={lockEndDate} />}
        </InfosWrapper>
        <ContainedButton onClick={goToSAxial}>Lock</ContainedButton>
        {Number(unlockedAxialAmount || 0) > 0 && (
          <ContainedButton
            onClick={withdrawSAxial}
            loading={isWithdrawingGovernanceToken}
          >
            Withdraw
          </ContainedButton>
        )}
      </StyledSnowPaper>
      <StyledSnowPaper>
        <IconWrapper>
          <StyledIcon src={veAxialIcon} />
          <TokenTitle>veAxial</TokenTitle>
        </IconWrapper>
        <Desc>{t(translations.Staking.StakingRootveAxialDescs())}</Desc>
        <InfosWrapper>
          <Info title="veAxial" value={veAxialBalance || "0.000"} />
          <Info
            title="AXIAL Staked"
            value={stakedAxialIntoVeAxial || "0.000"}
          />
        </InfosWrapper>
        <ContainedButton onClick={goToVeAxial}>Deposit</ContainedButton>
        {Number(veAxialBalance || 0) > 0 && (
          <ContainedButton
            onClick={withdrawVeAxial}
            loading={isWithdrawingAccruingToken}
          >
            Withdraw
          </ContainedButton>
        )}
      </StyledSnowPaper>
    </Wrapper>
  );
};

const InfosWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const TokenTitle = styled("span")({
  fontFamily: FontFamilies.FugazOne,
  fontSize: "26px",
  color: CssVariables.commonTextColor,
});

const Desc = styled("span")({
  margin: "auto",
  textAlign: "center",
  maxWidth: "280px",
  fontFamily: FontFamilies.IBMPlexSans,
  fontSize: "14px",
  fontWeight: 700,
  color: CssVariables.commonTextColor,
});

const IconWrapper = styled("div")({
  margin: "auto",
  display: "flex",
  gap: "12px",
});

const StyledIcon = styled("img")({
  maxWidth: "32px",
  maxHeight: "32px",
});

const Wrapper = styled(Max1040)({
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  [mobile]: {
    padding: 0,
    width: "100%",
  },
});

const StyledSnowPaper = styled(SnowPaper)({
  padding: "24px 32px",
  width: "100%",
  position: "relative",
  maxWidth: "490px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: 1,
  border: `4px solid ${CssVariables.cardBorder}`,
  [mobile]: {
    maxWidth: "unset",
    width: "100%",
  },
});
