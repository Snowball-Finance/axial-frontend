import "./FarmInfoCard.scss"
import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"

interface Token {
  symbol: string;
  icon: string;
  value: string;
  percent?: string;
}[]
interface Props {
  tokens: Token[],
  reserve: string
}

function FarmInfoCard({ tokens, reserve }: Props): ReactElement | null {
  const { t } = useTranslation()
  return (
    <div className="poolInfoCard">
      <div className="bottom">
        <h4>{t("currencyReserves")}</h4>
        <span>{`$${reserve} ${t("inTotal")}`}</span>
        <FarmInfoTokensList tokens={tokens} />
      </div>
    </div>
  )
}





export const FarmInfoTokensList = (props: { tokens: Token[] }): JSX.Element => {
  const { tokens } = props
  return <div className="tokenList">
    {tokens.map((token, index) => (
      <div className="token" key={index}>
        <img alt="icon" src={token.icon} />
        <span className="bold">{`${token.symbol} ${token.percent ?? ''}`}</span>
        <span className="tokenValue">{token.value}</span>
      </div>
    ))}
  </div>
}

export default FarmInfoCard
