import { FC } from "react";
import { styled, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Message: FC = () => {
  // const { t } = useTranslation();

  return (
    <Text variant="body1">
      * You must have 50,000+ sAXIAL to submit a new proposal
    </Text>
  );
};

const Text = styled(Typography)({
  color: CssVariables.error,
});
