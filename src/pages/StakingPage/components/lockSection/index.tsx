import { styled } from "@mui/material"
import { selectMainTokenBalance } from "containers/BlockChain/selectors"
import { useDispatch, useSelector } from "react-redux"
import { selectEnteredMainTokenToStake } from "../../selectors"
import { StakingPageActions } from "../../slice"
import React from "react"

export const LockSection = () => {
  const dispatch = useDispatch()
  const balance = useSelector(selectMainTokenBalance)
  const enteredMainTokenToStake = useSelector(selectEnteredMainTokenToStake)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    dispatch(StakingPageActions.setEnteredMainTokenToStake(v))
  }

  console.log(balance)
  return (
    <Wrapper>
      <MainBalanceValueWrapper>
        <span>Balance</span>
        <span>{balance?.toString()}</span>
      </MainBalanceValueWrapper>
      <StakingInputWrapper>
        <input value={enteredMainTokenToStake} onChange={handleInputChange} />
      </StakingInputWrapper>
    </Wrapper>
  )
}

const MainBalanceValueWrapper = styled("div")({})

const StakingInputWrapper = styled("div")({})

const Wrapper = styled("div")({})
