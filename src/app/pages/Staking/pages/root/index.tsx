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
  flexDirection: "column",
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
        <TitleWrapper>
          <IconWrapper>
            <StyledIcon src={sAxialIcon} />
            <TokenTitle>sAXIAL</TokenTitle>
          </IconWrapper>
          <Desc>{t(translations.Staking.StakingRootsaxialDescs())}</Desc>
        </TitleWrapper>
        <InfoActionsWrapper>
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
        </InfoActionsWrapper>
        
      </StyledSnowPaper>
      <StyledSnowPaper>
      <TitleWrapper>
          <IconWrapper>
            <StyledIcon src={veAxialIcon} />
            <TokenTitle>veAXIAL</TokenTitle>
          </IconWrapper>
          <Desc>{t(translations.Staking.StakingRootveAxialDescs())}</Desc>
        </TitleWrapper>

        <InfoActionsWrapper>
          <InfosWrapper>
            <Info title="veAxial" value={veAxialBalance || "0.000"} />
            <Info
              title="AXIAL Staked"
              value={stakedAxialIntoVeAxial || "0.000"}
            />
          </InfosWrapper>
          <ContainedButton onClick={goToVeAxial}>Stake</ContainedButton>
          {Number(veAxialBalance || 0) > 0 && (
            <ContainedButton
              onClick={withdrawVeAxial}
              loading={isWithdrawingAccruingToken}
            >
              Withdraw
            </ContainedButton>
          )}
        </InfoActionsWrapper>
        
      </StyledSnowPaper>
    </Wrapper>
  );
};

const InfoActionsWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
});

const InfosWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "24px"
});

const TokenTitle = styled("span")({
  fontFamily: FontFamilies.FugazOne,
  fontSize: "26px",
  color: CssVariables.commonTextColor,
});

const TitleWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  order: "0",
  alignSelf: "stretch",
  flexGrow: "0",
  gap: "24px"
});

const Desc = styled("span")({
  textAlign: "center",
  fontFamily: FontFamilies.IBMPlexSans,
  fontSize: "14px",
  fontWeight: 700,
  color: CssVariables.commonTextColor,
});

const IconWrapper = styled("div")({
  display: "flex",
  gap: "8px",
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
  background: CssVariables.poolCardBackground,
  padding: "24px 32px",
  width: "100%",
  position: "relative",
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
