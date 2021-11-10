import "./Risk.scss"

import React, { ReactElement } from "react"

import TopMenu from "../../components/menu/TopMenu"
import { useTranslation } from "react-i18next"

function Risk(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="riskpage">
      <TopMenu activeTab={t("risk")} />
      <div className="content">
        <h3>{t("risk")}</h3>
        <p data-testid="risk-intro">
          {t("riskIntro")}{" "}
          <a href="https://github.com/Snowball-Finance/axial-protocol">
            {t("riskIntro2")}
          </a>{" "}
          {t("riskIntro3")}
        </p>
        <h3>{t("audits")}</h3>
        <p data-testid="risk-audits">
          {t("riskAudits1")}{" "}
          <a href="https://saddle.finance/">
            {t("riskAudits1LinkTitle")}
          </a>
          {t("riskAudits2")}{" "}
          <a href="https://github.com/Snowball-Finance/axial-protocol">
            {t("riskAudits2LinkTitle")}
          </a>
          <br />
          <br />
          {t("riskAudits3")}
          <br />
          <br />
          {t("riskAudits4")}
        </p>
        <h3>{t("adminKeys")}</h3>
        <p data-testid="risk-adminkeys">

          {t("riskAdminKeys")}
          <a href="https://snowballs.gitbook.io/snowball-docs/resources/security#2-council">
            {t("riskAdminKeysLinkTitle")}
          </a>
          {t("riskAdminKeys2")}
          <a href="https://snowtrace.io/address/0xfdCcf6D49A29f435E509DFFAAFDecB0ADD93f8C0">
            {t("riskAdminKeys2LinkTitle")}
          </a>
          {t("riskAdminKeys3")}
        </p>
        <h3>{t("lossOfPeg")}</h3>
        <p data-testid="risk-lossofpeg">{t("riskLossOfPeg")}</p>
        <h3>{t("riskTokenApproval")}</h3>
        <p>
          {t("unnecessaryApprovalAskA")} <br />
          <br />
          <a href="https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729">
            ERC: Token standard · Issue #20 · ethereum/EIPs
          </a>
        </p>
      </div>
    </div>
  )
}

export default Risk
