/**
 *
 * StakingPage
 *
 */

import React from "react"
import { useStakingPageSlice } from "./slice"
import { styled } from "@mui/material"
import { LockSection } from "./components/lockSection"
import { ClaimSection } from "./components/claimSection"

interface Props {}
export function StakingPage(props: Props) {
  useStakingPageSlice()

  return (
    <Wrapper>
      <LockSection />
      <ClaimSection />
    </Wrapper>
  )
}

const Wrapper = styled("div")({})
