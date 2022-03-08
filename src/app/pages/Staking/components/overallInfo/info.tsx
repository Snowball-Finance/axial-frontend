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
        <>{title}</>
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

const Value = styled("div")({
  margin: 0,
  color: CssVariables.commonTextColor,
  fontSize: "18px",
  fontWeight: 400,
  fontFamily:'IBM Plex Sans !important',
});

const Title = styled("h6")({
  display: "flex",
  gap: "6px",
  fontSize: "16px",
  margin: 0,
  color: CssVariables.commonTextColor,
});

const Wrapper = styled(Box)({});
