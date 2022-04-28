import { Divider, styled } from "@mui/material";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { SelectablePoolProvider } from "app/pages/Governance/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SubListTitle } from "./styles";

export const PoolProviders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const providers: SelectablePoolProvider[] = useSelector(
    GovernancePageSelectors.poolProviders
  );

  const handleProviderClick = (name: string) => {
    dispatch(GovernancePageActions.toggleSelectedPoolProvider(name));
  };

  return (
    <Wrapper>
      <SubListTitle>{t(translations.Common.Filter())}</SubListTitle>
      <ItemsWrapper>
        {providers.map((item) => {
          return (
            <Item
              key={item.name}
              selected={item.selected ? "true" : ""}
              onClick={() => handleProviderClick(item.name)}
            >
              {item.name}
            </Item>
          );
        })}
      </ItemsWrapper>
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "16px",
});

const Item = styled("div")<{ selected: "true" | "" }>(({ selected }) => ({
  cursor: "pointer",
  background: CssVariables.lightTint,
  borderRadius: "4px",
  fontSize: "12px",
  padding: "6px 8px",
  color: CssVariables.dark,
  fontWeight: 600,
  marginBottom: "12px",
  ...(selected && {
    color: CssVariables.white,
    background: CssVariables.primary,
  }),
}));

const ItemsWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
});
