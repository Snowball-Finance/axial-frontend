import { FC } from "react";
import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowSelect } from "app/components/base/SnowSelect";
import { SnowSelectInterface } from "app/components/base/SnowSelect/types";
import { ProposalFilters } from "app/containers/BlockChain/Governance/types";
import { CssVariables } from "styles/cssVariables/cssVariables";

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

export const Filter: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSelect
      //@ts-ignore ignored because we know it's ok to pass the value as Proposal filter enum
      onChange={() => {}}
      options={selectOptions({ t })}
      isFilter
      selectedValue={ProposalFilters.All}
    />
  );
};

const StyledSelect = styled(SnowSelect)({
  minWidth: "205px",
  ".MuiSelect-outlined": {
    paddingLeft: 0,
  },

  "&.MuiOutlinedInput-root": {
    backgroundColor: CssVariables.poolCardBackground,
    border: `4px solid ${CssVariables.cardBorder}`,
  },
});
