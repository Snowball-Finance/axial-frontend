import { styled } from "@mui/material";
import governanceNarrowHeadBackground from 'assets/governanceNarrowHeadBackground.svg'
import coin from "assets/header-coin.png";
import React,{ FC } from "react";
import { CssVariables } from "../../../../styles/cssVariables/cssVariables";
import { SnowPaper } from "../../../../components/injectedByNewStructure/base/SnowPaper";
import { mobile } from "../../../../styles/media";


interface PageHeadProps {
  title: string;
  description: string;
  image?: string;
  endImage?: string;
}

export const PageHead: FC<PageHeadProps> = ({
  title,
  description,
  image,
}) => {
  const bg = image ?? governanceNarrowHeadBackground;
  return (
    <Wrapper elevation={0} image={bg}>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
      <ImageWrapper  />
    </Wrapper>
  );
};

const ImageWrapper = styled("div")(({ image }: { image?: string }) => ({
  width: "164px",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  ...(image &&{
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundImage: `url(${image})`,
  })
}));

const Title = styled("h6")({
  color: CssVariables.white,
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: 0,
});

const Desc = styled("p")({
  color: CssVariables.white,
  fontSize: "12px",
});
const Wrapper = styled(SnowPaper)(({ image }: { image: string }) => ({
  width: "100%",
  height: "100px",
  display: "flex",
  position: "relative",
  alignItems: "flex-start",
  flexDirection: "column",
  backgroundSize: "cover",
  justifyContent: "center",
  padding: "0 32px",
  backgroundImage: `url(${image})`,
  [mobile]: {
    width: "calc(100% - 32px)",
    margin: "auto",
  },
}));
