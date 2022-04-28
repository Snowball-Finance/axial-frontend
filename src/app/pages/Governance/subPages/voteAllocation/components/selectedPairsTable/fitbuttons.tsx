import { styled } from "@mui/material";
import { TextButton } from "app/components/common/buttons/textButton";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const FitButtons = () => {
  const selectedPairs = useSelector(
    GovernancePageSelectors.selectedVoteAllocationPairsArray
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFitProportionallyClick = () => {
    dispatch(GovernancePageActions.fitSelectedPairsProportionally());
  };

  const handleFitEquallyClick = () => {
    dispatch(GovernancePageActions.fitSelectedPairsEqually());
  };

  return selectedPairs.length < 2 ? (
    <></>
  ) : (
    <ButtonsWrapper>
      <TextButton onClick={handleFitProportionallyClick}>
        {t(translations.GovernancePage.VoteAllocation.FitProportionally())}
      </TextButton>
      <TextButton onClick={handleFitEquallyClick}>
        {t(translations.GovernancePage.VoteAllocation.FitEqually())}
      </TextButton>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled("div")({});
