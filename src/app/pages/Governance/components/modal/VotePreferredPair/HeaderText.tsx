import { FC } from "react";
import { styled, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const HeaderText: FC = () => {
  // const { t } = useTranslation();

  return (
    <Text variant="body2">
      Once voted, your vote will rollover to the following week. There is no
      need to vote more than once, unless you would like to make changes to your
      original vote.
    </Text>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
