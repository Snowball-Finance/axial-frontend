import { styled } from "@mui/material";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { addDays } from "app/pages/Staking/utils/addDays";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const LockPeriod = () => {
  const { t } = useTranslation();
  let selectedEpoch = useSelector(StakingPageSelectors.selectSelectedEpoch);
  const daysToUnlock = useSelector(StakingPageSelectors.remainingDaysToShow);
  if (daysToUnlock !== 0 && daysToUnlock && selectedEpoch) {
    const dateWhenAddedDaysToUnlockToSelectedEpoch = addDays(
      selectedEpoch,
      daysToUnlock
    );
    selectedEpoch = dateWhenAddedDaysToUnlockToSelectedEpoch;
  }
  return (
    <Wrapper>
      <Title>{t(translations.Staking.LockPeriod())}</Title>
      {daysToUnlock ? (
        <SubTitle>
          days to unlock all tokens :{daysToUnlock}, selected from slider will
          be added to this
        </SubTitle>
      ) : (
        <></>
      )}
      <InputWrapper>
        {selectedEpoch?.toLocaleString().split(",")[0]}
      </InputWrapper>
    </Wrapper>
  );
};

const SubTitle = styled("h6")({
  fontSize: "11px",
  margin: 0,
  color: CssVariables.primary,
});

const Title = styled("h6")({
  margin: 0,
  fontSize: "26px",
  textTransform: "uppercase",
});

const Wrapper = styled("div")({
  color: CssVariables.commonTextColor,
});

const InputWrapper = styled("div")({
  padding: "10px 16px",
  borderRadius: CssVariables.paperBorderRadius,
  border: `4px solid ${CssVariables.cardBorder}`,
  minHeight: "46px",
  textAlign: "end",
  fontSize: "26px",
});
