import { styled } from "@mui/material";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import CrossIcon from "assets/images/iconComponents/cross";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const SelectedPairs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedPairs = useSelector(
    GovernancePageSelectors.selectedVoteAllocationPairsArray
  );
  const noSelectedPair = selectedPairs.length === 0;

  const handleRemoveGaugeClick = (e: any, gauge: GaugeItem) => {
    e.stopPropagation();
    dispatch(GovernancePageActions.toggleSelectedGauge(gauge));
  };

  return (
    <>
      {noSelectedPair ? (
        <PlaceHolder>
          <span>
            {t(translations.GovernancePage.VoteAllocation.SelectYourTokens())}
          </span>
          <span>
            <ArrowDropDownRoundedIcon />
          </span>
        </PlaceHolder>
      ) : (
        <ChipsWrapper>
          {selectedPairs.map((pair) => {
            return (
              <PairChip
                key={pair.address}
                onClick={(e) => handleRemoveGaugeClick(e, pair)}
              >
                {pair.depositTokenName}
                <CrossIcon color={CssVariables.white} size={24} />
              </PairChip>
            );
          })}
        </ChipsWrapper>
      )}
    </>
  );
};

const PlaceHolder = styled("p")({
  cursor: "pointer",
  color: CssVariables.placeholderColor,
  fontSize: "20px",
  margin: 0,
  display: "flex",
  justifyContent: "space-between",
});

const ChipsWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  gap: "8px",
});

const PairChip = styled(ContainedButton)({
  height: "28px",
  color: CssVariables.white,
  fontSize: "14px",
  fontWeight: 600,
  gap: "12px",
  paddingRight: "8px",
});
