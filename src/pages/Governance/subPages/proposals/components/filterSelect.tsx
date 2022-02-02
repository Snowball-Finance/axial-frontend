import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SnowPaper } from "../../../../../components/injectedByNewStructure/base/SnowPaper";
import { SnowSelect } from "../../../../../components/injectedByNewStructure/base/SnowSelect";
import { SnowSelectInterface } from "../../../../../components/injectedByNewStructure/base/SnowSelect/types";
import { selectSelectedProposalFilter } from "../../../../../containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "../../../../../containers/BlockChain/Governance/slice";
import { ProposalFilters } from "../../../../../containers/BlockChain/Governance/types";
import { mobile } from "../../../../../styles/media";
import React from 'react'
import { CssVariables } from "styles/cssVariables/cssVariables";

const selectOptions = ({ t }): SnowSelectInterface["options"] => [
  {
    label: t("AllProposals"),
    value: ProposalFilters.All,
  },
  {
    label: t("ActiveProposals"),
    value: ProposalFilters.Active,
  },
];

export const ProposalFilterSelect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectSelectedProposalFilter);
  const handleFilterChange = (v: ProposalFilters) => {
    dispatch(GovernanceActions.setProposalFilter(v));
  };
  return (
    <SnowPaper elevation={0}>
      <StyledSelect
        //@ts-ignore ignored because we know it's ok to pass the value as Proposal filter enum
        onChange={handleFilterChange}
        options={selectOptions({ t })}
        isFilter
        selectedValue={selectedFilter}
      />
    </SnowPaper>
  );
};

const StyledSelect = styled(SnowSelect)({
  minWidth: "205px",
  minHeight:'48px',
  border:`1px solid ${CssVariables.ctaBlue}`,
  ".MuiSelect-outlined": {
    paddingLeft: 0,
  },
  ".MuiInputBase-input": {
  color:CssVariables.white
  },
  [mobile]: {
    width: "calc(100vw - 32px)",
  },
});
