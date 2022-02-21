import { Box, styled, Tooltip } from "@mui/material";
import InfoIcon from "assets/images/iconComponents/info";
import { FC, ReactNode } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface Props {
  title: string;
  value: string;
  help?: ReactNode;
}

export const Info: FC<Props> = ({ value, help, title }) => {
  return (
    <Wrapper>
      <Title>
        <span>{title}</span>
        {help && (
          <Tooltip arrow title={help}>
            <Box>
              <InfoIcon color={CssVariables.commonTextColor} />
            </Box>
          </Tooltip>
        )}
      </Title>
      <Value>{value}</Value>
    </Wrapper>
  );
};

const Value = styled("h6")({
  margin: 0,
  fontSize: "16px",
  fontWeight: 400,
  color: CssVariables.commonTextColor,
});

const Title = styled("div")({
  display: "flex",
  gap: "6px",
  color: CssVariables.commonTextColor,
});

const Wrapper = styled(Box)({});
