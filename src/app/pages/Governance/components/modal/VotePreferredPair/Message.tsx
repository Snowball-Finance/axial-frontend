import { FC } from "react";
import { styled, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";

export const Message: FC = () => {
  // const { t } = useTranslation();

  return (
    <CardWrapper>
      <Text variant="body2">
        If you have already voted, there is no need to vote more than once
        unless you want to make changes to your original vote. If the total
        percentage does not equal 100, then we will automatically adjust
        proportionately so it does.
      </Text>
    </CardWrapper>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
