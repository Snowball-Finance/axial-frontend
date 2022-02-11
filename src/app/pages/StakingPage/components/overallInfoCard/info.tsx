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
              <InfoIcon color={CssVariables.darkText} />
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
  color: CssVariables.darkText,
});

const Title = styled("div")({
  display: "flex",
  gap: "6px",
});

const Wrapper = styled(Box)({});
