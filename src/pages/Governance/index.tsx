/**
 *
 * Governance
 *
 */

import React from "react"
import { useTranslation } from "react-i18next"
import { Box, styled } from "@mui/material"
import { PageHead } from "./components/pageHead"
import { GovernanceBody } from "./body"
import { useGovernancePageSlice } from "./slice"
import governanceNarrowHeadBackground from "assets/governanceNarrowHeadBackground.svg"
import { Max1040 } from "components/injectedByNewStructure/wrappers/max1040"
import { mobile } from "styles/media"

export function GovernancePage() {
  useGovernancePageSlice()
  const { t } = useTranslation()
  return (
    <>
      <Box mb={4} />
      <StyledMax1040>
        <PageHead
          title={t("Governance")}
          description={t("Description")}
          image={governanceNarrowHeadBackground}
        />
      </StyledMax1040>
      <Box mb={4} />
      <GovernanceBody />
    </>
  )
}
const StyledMax1040 = styled(Max1040)(() => ({
  position: "relative",
  width: "100%",
  margin: "auto",
  [mobile]: {
    padding: "0 16px",
  },
}))
