import { Deadlines, GasPrices, Slippages } from "../../store/module/user"
import React, { ReactElement } from "react"
import {
  updateGasPriceCustom,
  updateGasPriceSelected,
  updateInfiniteApproval,
  updatePoolAdvancedMode,
  updateSlippageCustom,
  updateSlippageSelected,
  updateTransactionDeadlineCustom,
  updateTransactionDeadlineSelected,
} from "../../store/module/user"

import { useDispatch, useSelector } from "react-redux"

import { AppDispatch } from "../../store"
import { AppState } from "../../store/index"

import CheckboxInput from "../checkbox-input/CheckboxInput"
import { PayloadAction } from "@reduxjs/toolkit"
import ToolTip from "../tool-tip/ToolTip"
import classNames from "classnames"
import styles from "./AdvancedOptions.module.scss"
import { useTranslation } from "react-i18next"

export default function AdvancedOptions(): ReactElement {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const {
    infiniteApproval,
    slippageCustom,
    slippageSelected,
    transactionDeadlineSelected,
    transactionDeadlineCustom,
    gasCustom,
    gasPriceSelected,
    userPoolAdvancedMode: advanced,
  } = useSelector((state: AppState) => state.user)

  const { gasStandard, gasFast, gasInstant } = useSelector(
    (state: AppState) => state.application,
  )

  return (
    <div className={styles.advancedOptions}>
      <span
        className={styles.title}
        onClick={(): PayloadAction<boolean> =>
          dispatch(updatePoolAdvancedMode(!advanced))
        }
      >
        {t("advancedOptions")}
        <svg
          className={classNames(styles.triangle, {
            [styles.upsideDown]: advanced,
          })}
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.8252 0C16.077 0 16.3783 0.827943 15.487 1.86207L8.80565 9.61494C8.35999 10.1321 7.63098 10.1246 7.19174 9.61494L0.510262 1.86207C-0.376016 0.833678 -0.0777447 0 1.17205 0L14.8252 0Z"
            fill="#3290FE"
          />
        </svg>
      </span>
      <div className={styles.divider}></div>
      <div
        className={classNames(styles.tableContainer, {
          [styles.show]: advanced,
        })}
      >
        <div className={styles.parameter}>
          <div className={styles.infiniteApproval}>
            <CheckboxInput
              checked={infiniteApproval}
              onChange={(): PayloadAction<boolean> =>
                dispatch(updateInfiniteApproval(!infiniteApproval))
              }
            />
            <ToolTip content={t("infiniteApprovalTooltip")}>
              <span className={styles.label}>{t("infiniteApproval")}</span>
            </ToolTip>
          </div>
        </div>
        <div className={styles.parameter}>
          <div className={styles.inputGroup}>
            <div className={styles.options}>
              <div className={styles.label}>{t("maxSlippage")}: </div>
              <button
                className={classNames({
                  [styles.selected]: slippageSelected === Slippages.OneTenth,
                })}
                onClick={(): PayloadAction<Slippages> =>
                  dispatch(updateSlippageSelected(Slippages.OneTenth))
                }
              >
                <span>0.1%</span>
              </button>
              <button
                className={classNames({
                  [styles.selected]: slippageSelected === Slippages.One,
                })}
                onClick={(): PayloadAction<Slippages> =>
                  dispatch(updateSlippageSelected(Slippages.One))
                }
              >
                <span>1%</span>
              </button>
              <div>
                <input
                  value={slippageCustom?.valueRaw}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const value = e.target.value
                    if (value && !isNaN(+value)) {
                      dispatch(updateSlippageCustom(value))
                      if (slippageSelected !== Slippages.Custom) {
                        dispatch(updateSlippageSelected(Slippages.Custom))
                      }
                    } else {
                      dispatch(updateSlippageSelected(Slippages.OneTenth))
                    }
                  }}
                />
                &nbsp;%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
