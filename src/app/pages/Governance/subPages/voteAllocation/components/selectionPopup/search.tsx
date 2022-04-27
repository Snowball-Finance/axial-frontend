import { styled } from "@mui/material";
import { SearchInput } from "app/components/base/searchInput";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const PairSelectionSearchInput = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const value = useSelector(GovernancePageSelectors.pairSearchInputValue);

  const handleChange = (e: string) => {
    dispatch(GovernancePageActions.setPairSearchInput(e));
  };

  return (
    <Wrapper>
      <SearchInput
        onChange={handleChange}
        value={value}
        onClearClick={() => handleChange("")}
        placeHolder={t(translations.Common.Search())}
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.white,
  border: "1px solid " + CssVariables.lightGrey,
  borderRadius: CssVariables.paperBorderRadius,
});
