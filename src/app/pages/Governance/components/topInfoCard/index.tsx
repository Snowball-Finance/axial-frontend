import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface TopInfoCardProps {
  title: string;
  desc: string;
  endImage?: string;
  actionButtons?: React.ReactNode[];
}

export const TopInfoCard: FC<TopInfoCardProps> = ({
  title,
  desc,
  endImage,
  actionButtons,
}) => {
  return (
    <Wrapper elevation={0}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      {actionButtons && (
        <ButtonsWrapper>
          {actionButtons.map((item, index) => item)}
        </ButtonsWrapper>
      )}
      {endImage && <ImageWrapper image={endImage} />}
    </Wrapper>
  );
};

const ButtonsWrapper = styled("div")({
  display: "flex",
  gap: "8px",
});

const ImageWrapper = styled("div")(({ image }: { image: string }) => ({
  width: "130px",
  height: "100%",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${image})`,
  position: "absolute",
  right: 25,
  top: 0,
}));

const Title = styled("h6")({
  color: CssVariables.white,
  fontSize: "14px",
  fontWeight: 400,
  margin: 0,
});

const Desc = styled("p")({
  maxWidth: "500px",
  color: CssVariables.white,
  fontSize: "12px",
  zIndex: 1,
  marginBottom: "16px",
});
const Wrapper = styled(SnowPaper)({
  width: "100%",
  minHeight: "160px",
  display: "flex",
  position: "relative",
  alignItems: "flex-start",
  flexDirection: "column",
  backgroundSize: "cover",
  justifyContent: "center",
  padding: "0 32px",
  background: CssVariables.paperBackground,
});
