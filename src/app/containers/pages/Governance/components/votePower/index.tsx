import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { selectSnowConeBalance } from "app/containers/BlockChain/selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import xSnobBalanceBackground from "assets/images/vote-power.png";
import { CssVariables } from "styles/cssVariables/cssVariables";
import logo from "assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";

export const VotePower: FC = () => {
  const xSnobBalance = useSelector(selectSnowConeBalance)
  const { t } = useTranslation()
  console.log(xSnobBalance)
  return (
    <Wrapper elevation={0}>
      <LogoWrapper >
        <img src={logo} alt="" />
      </LogoWrapper>
      <ContentWrapper>
        <ContentTitle>
          {t(translations.GovernancePage.VotingPower())}
        </ContentTitle>
        <XSnobValue>
          <span>{xSnobBalance??'0.000'}</span><span>XSNOB</span>
        </XSnobValue>
      </ContentWrapper>
    </Wrapper>
  )
}


const ContentTitle = styled('p')({
  fontSize: '0.875rem',
  color: CssVariables.white
})

const XSnobValue = styled('p')({
  fontSize: '24px',
  color: CssVariables.white,
  margin: 0,
  display: 'flex',
  gap: '6px'
})

const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  padding: '0px 20px',
})

const LogoWrapper = styled('div')({
  width: '62px',
  marginRight: '16px',
  'img': {
    maxWidth: '100%',
  },
  alignSelf: 'center'
})

const Wrapper = styled(SnowPaper)({
  backgroundImage: `url(${xSnobBalanceBackground})`,
  backgroundColor: CssVariables.primaryBlue,
  backgroundSize: 'cover',
  width: '440px',
  height: '140px',
  display: 'flex',
  padding: '16px'
})