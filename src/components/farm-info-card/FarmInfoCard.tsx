import "./FarmInfoCard.scss"
import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"

interface Props {
  tokens: {
    symbol: string;
    name: string;
    icon: string;
    value: string;
    max: string;
    percent: string;
  }[],
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
interface Token {
  symbol: string;
  name: string;
  icon: string;
  value: string;
  percent: string;
}[]
export const FarmInfoTokensList = (props: { tokens: Token[] }): JSX.Element => {
  const { tokens } = props
  return <div className="tokenList">
    {tokens.map((token, index) => (
      <div className="token" key={index}>
        <img alt="icon" src={token.icon} />
        <span className="bold">{`${token.symbol} ${token.percent}`}</span>
        <span className="tokenValue">{token.value}</span>
      </div>
    ))}
  </div>
}

export default FarmInfoCard
