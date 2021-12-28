import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { FC } from "react";
import coin from 'assets/images/header-coin.png'
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowButton } from "app/components/base/snowButton";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";


interface TopInfoCardProps {
  title: string;
  desc: string;
  endImage?: string;
  moreInfoLink?: string;
}

export const TopInfoCard: FC<TopInfoCardProps> = ({
  title,
  desc,
  endImage,
  moreInfoLink
}) => {
  const {t} = useTranslation()

  const endImg = endImage ?? coin

  return (
    <Wrapper elevation={0}  >
      <Title>
        {title}
      </Title>
      <Desc>
        {desc}
      </Desc>
      {moreInfoLink && (
        <MoreInfoLink as='a' href={moreInfoLink} >
          {t(translations.Common.MoreInfo())}
        </MoreInfoLink>
      )}
      <ImageWrapper image={endImg} />
    </Wrapper>
  )
}

const MoreInfoLink = styled(SnowButton)({

})

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
  color: CssVariables.darkText,
  fontSize: '14px',
  fontWeight: 400,
  margin: 0,
})

const Desc = styled('p')({
  color: CssVariables.darkText,
  fontSize: '12px',
})


const Wrapper = styled(SnowPaper)({
  width: '100%',
  height: '140px',
  display: 'flex',
  position: 'relative',
  alignItems: 'flex-start',
  flexDirection: 'column',
  backgroundSize: 'cover',
  justifyContent: 'center',
  padding: '0 32px',
  background:CssVariables.lightBlue
})