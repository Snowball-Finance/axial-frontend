import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import bgImage from 'assets/images/page-head-bg-image.png'
import coin from 'assets/images/header-coin.png'
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface PageHeadProps {
  title: string;
  description: string;
  image?: string;
  endImage?: string;
}

export const PageHead: FC<PageHeadProps> = ({ title, description, image, endImage }) => {
  const bg = image ?? bgImage
  const endImg = endImage ?? coin
  return (
    <Wrapper elevation={0} image={bg} >
      <Title>
        {title}
      </Title>
      <Desc>
        {description}
      </Desc>
      <ImageWrapper image={endImg} />
    </Wrapper>
  )
}

const ImageWrapper = styled('div')(({ image }: { image: string }) => ({
  width: '164px',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${image})`,
  position: 'absolute',
  right: 0,
  top: 0
}))

const Title = styled('h6')({
  color: CssVariables.white,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: 0,
})

const Desc = styled('p')({
  color: CssVariables.white,
  fontSize: '12px',
})


const Wrapper = styled(SnowPaper)(({ image }: { image: string }) => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  position: 'relative',
  alignItems: 'flex-start',
  flexDirection: 'column',
  backgroundSize: 'cover',
  justifyContent: 'center',
  padding: '0 32px',
  backgroundImage: `url(${image})`,
}))