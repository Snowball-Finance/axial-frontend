import { paperClasses, styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { SnowSelect } from "app/components/base/SnowSelect";
import { SnowSelectInterface } from "app/components/base/SnowSelect/types";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { ProposalFilters } from "app/containers/BlockChain/Governance/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
const selectOptions = ({ t }): SnowSelectInterface["options"] => [
  {
    label: t(translations.GovernancePage.AllProposals()),
    value: ProposalFilters.All,
  },
  {
    label: t(translations.GovernancePage.ReadyForExecution()),
    value: ProposalFilters.ReadyForExecution,
  },
  {
    label: t(translations.GovernancePage.Active()),
    value: ProposalFilters.Active,
  },
  {
    label: t(translations.GovernancePage.Defeated()),
    value: ProposalFilters.Defeated,
  },
];

export const ProposalFilterSelect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedFilter = useSelector(
    GovernanceSelectors.selectSelectedProposalFilter
  );
  const handleFilterChange = (v: ProposalFilters) => {
    dispatch(GovernanceActions.setProposalFilter(v));
  };
  return (
    <StyledSnowPaper>
      <StyledSelect
        //@ts-ignore ignored because we know it's ok to pass the value as Proposal filter enum
        onChange={handleFilterChange}
        options={selectOptions({ t })}
        isFilter
        selectedValue={selectedFilter}
      />
    </StyledSnowPaper>
  );
};

const StyledSnowPaper = styled(SnowPaper)({
  borderRadius: CssVariables.buttonBorderRadius,
});

const StyledSelect = styled(SnowSelect)({
  minWidth: "205px",
  ".MuiSelect-outlined": {
    paddingLeft: 0,
  },
  [mobile]: {
    width: "calc(100vw - 32px)",
  },
});
