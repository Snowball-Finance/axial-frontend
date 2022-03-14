import { styled } from "@mui/material";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";

export const TitleAndValue = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Wrapper>
  );
};

const Wrapper = styled("p")({
  margin: 0,
  marginBottom: "8px",
});

const Title = styled("span")({
  fontSize: "16px",
  paddingRight: "6px",
  color: CssVariables.commonTextColor,
  fontFamily: FontFamilies.IBMPlexSans,
  fontWeight: 700,
});

const Value = styled("span")({
  fontSize: "16px",
  color: CssVariables.commonTextColor,
  fontFamily: FontFamilies.IBMPlexSans,
});
