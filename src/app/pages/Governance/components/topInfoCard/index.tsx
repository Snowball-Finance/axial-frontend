import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { FC } from "react";
import coin from "assets/images/header-coin.png";
import { CssVariables } from "styles/cssVariables/cssVariables";

import {
  InfoButton,
  InfoButtonProps,
} from "app/components/common/buttons/infoButton";
interface TopInfoCardProps {
  title: string;
  desc: string;
  endImage?: string;
  actionButtons?: InfoButtonProps[];
}

export const TopInfoCard: FC<TopInfoCardProps> = ({
  title,
  desc,
  endImage,
  actionButtons,
}) => {
  const endImg = endImage ?? coin;

  return (
    <Wrapper elevation={0}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      {actionButtons && (
        <ButtonsWrapper>
          {actionButtons.map((item, index) => (
            <InfoButton key={index} {...item} />
          ))}
        </ButtonsWrapper>
      )}
      <ImageWrapper image={endImg} />
    </Wrapper>
  );
};

const ButtonsWrapper = styled("div")({
  display: "flex",
  gap: "8px",
});

const ImageWrapper = styled("div")(({ image }: { image: string }) => ({
  width: "164px",
  height: "100%",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${image})`,
  position: "absolute",
  right: 0,
  top: 0,
}));

const Title = styled("h6")({
  color: CssVariables.darkText,
  fontSize: "14px",
  fontWeight: 400,
  margin: 0,
});

const Desc = styled("p")({
  maxWidth: "500px",
  color: CssVariables.darkText,
  fontSize: "12px",
  zIndex: 1,
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
  background: CssVariables.lightBlue,
});
