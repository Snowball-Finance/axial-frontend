import { styled } from "@mui/material"
import { SnowButton } from "app/components/base/snowButton"
import { selectAccount } from "app/containers/BlockChain/Web3/selectors"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

export const WalletToggle=()=>{
  const walletAddress=useSelector(selectAccount)
  const {t}=useTranslation()
const handleConnectClick=()=>{
  
}
  return (
  <>
  {walletAddress?
  <span>{walletAddress}</span>:
  <ConnectButton onClick={handleConnectClick}>
    {t(translations.Common.ConnectToWallet())}
    </ConnectButton>}
  </>
  )
}

const ConnectButton=styled(SnowButton)({})