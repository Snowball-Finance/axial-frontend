import { styled } from "@mui/material"

import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import LeftArrowIcon from "../../../../../assets/iconComponents/leftArrow"
import { CssVariables } from "../../../../../styles/cssVariables/cssVariables"

interface TopBackButtonProps {
  to: string
  destinationName: string
}
export const TopBackButton: FC<TopBackButtonProps> = ({
  to,
  destinationName,
}) => {
  const { t } = useTranslation()
  const history = useHistory()
  const handleBackClick = () => {
    history.replace(to)
  }

  return (
    <Wrapper onClick={handleBackClick}>
      <LeftArrowIcon color={CssVariables.dark} />
      <Title>{t("GoBackTo", { name: destinationName })}</Title>
    </Wrapper>
  )
}

const Title = styled("p")({
  margin: 0,
  color: CssVariables.dark,
  fontSize: "16px",
  fontWeight: 500,
})

const Wrapper = styled("div")({
  display: "flex",
  lineHeight: "26px",
  gap: "8px",
  width: "fit-content",
  cursor: "pointer",
})
