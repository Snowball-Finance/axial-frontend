import { styled } from "@mui/material";
import LeftArrowIcon from "assets/images/iconComponents/leftArrow";
import { replace } from "connected-react-router";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface TopBackButtonProps {
  to: string;
  destinationName: string;
}
export const TopBackButton: FC<TopBackButtonProps> = ({
  to,
  destinationName,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(replace(to));
  };

  return (
    <Wrapper onClick={handleBackClick}>
      <LeftArrowIcon color={CssVariables.dark} />
      <Title>
        {t(translations.Common.GoBackTo(), { name: destinationName })}
      </Title>
    </Wrapper>
  );
};

const Title = styled("p")({
  margin: 0,
  color: CssVariables.dark,
  fontSize: "16px",
  fontWeight: 500,
});

const Wrapper = styled("div")({
  display: "flex",
  lineHeight: "26px",
  gap: "8px",
  width: "fit-content",
  cursor: "pointer",
});
