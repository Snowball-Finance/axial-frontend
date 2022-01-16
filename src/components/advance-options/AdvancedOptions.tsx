import {
  updateInfiniteApproval,
  updatePoolAdvancedMode,
  updateSlippageCustom,
  updateSlippageSelected,
} from "../../store/module/user"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store"
import { AppState } from "../../store/index"
import CheckboxInput from "../checkbox-input/CheckboxInput"
import { PayloadAction } from "@reduxjs/toolkit"
import React from "react"
import { Slippages } from "../../store/module/user"
import ToolTip from "../tool-tip/ToolTip"
import classNames from "classnames"
import styles from "./AdvancedOptions.module.scss"
import { useTranslation } from "react-i18next"
import { analytics } from "../../utils/analytics"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  noApprovalCheckbox: boolean
  noSlippageCheckbox: boolean
}

export default function AdvancedOptions(props: Props): React.ReactElement {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const {
    infiniteApproval,
    slippageCustom,
    slippageSelected,
    userPoolAdvancedMode: advanced,
  } = useSelector((state: AppState) => state.user)

  const handleInfiniteApproval = (): void => {
    dispatch(updateInfiniteApproval(!infiniteApproval))
    analytics.trackEvent({
      category: "User",
      action: "Toggled Infinite Approval",
      name: infiniteApproval ? "Off" : "On",
    })
  }

  const handleSlippageSelected = (value: Slippages): void => {
    dispatch(updateSlippageSelected(value))
    analytics.trackEvent({
      category: "User",
      action: "Toggled Slippage",
      name: value,
    })
  }

  const handleSlippageCustom = (value: string): void => {
    dispatch(updateSlippageCustom(value))
    analytics.trackEvent({
      category: "User",
      action: "Updated Slippage Custom",
      name: value,
    })
  }

  return (
    <div className={styles.advancedOptions}>
      <div className={styles.titleBox}>
      {props.noApprovalCheckbox && props.noSlippageCheckbox ? null : (

        <span
          className={styles.title}
          onClick={(): PayloadAction<boolean> =>
            dispatch(updatePoolAdvancedMode(!advanced))
          }
        >
          <span className={styles.settings}>
            <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_15_15299)">
              <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" stroke="#E5E6E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9332 10.5003C12.8445 10.7014 12.818 10.9245 12.8572 11.1407C12.8964 11.357 12.9995 11.5565 13.1532 11.7137L13.1932 11.7537C13.3172 11.8775 13.4155 12.0245 13.4826 12.1864C13.5497 12.3483 13.5843 12.5218 13.5843 12.697C13.5843 12.8722 13.5497 13.0457 13.4826 13.2076C13.4155 13.3694 13.3172 13.5165 13.1932 13.6403C13.0694 13.7643 12.9223 13.8626 12.7605 13.9297C12.5986 13.9968 12.4251 14.0314 12.2499 14.0314C12.0747 14.0314 11.9012 13.9968 11.7393 13.9297C11.5774 13.8626 11.4304 13.7643 11.3066 13.6403L11.2666 13.6003C11.1094 13.4466 10.9099 13.3435 10.6936 13.3043C10.4774 13.2651 10.2543 13.2916 10.0532 13.3803C9.85605 13.4648 9.68789 13.6052 9.56944 13.784C9.45099 13.9629 9.38742 14.1725 9.38656 14.387V14.5003C9.38656 14.8539 9.24609 15.1931 8.99604 15.4431C8.74599 15.6932 8.40685 15.8337 8.05323 15.8337C7.69961 15.8337 7.36047 15.6932 7.11042 15.4431C6.86037 15.1931 6.7199 14.8539 6.7199 14.5003V14.4403C6.71474 14.2197 6.64331 14.0057 6.5149 13.8261C6.3865 13.6466 6.20705 13.5098 5.9999 13.4337C5.79882 13.3449 5.57577 13.3184 5.35951 13.3577C5.14324 13.3969 4.94368 13.5 4.78656 13.6537L4.74656 13.6937C4.62273 13.8176 4.47568 13.916 4.31382 13.9831C4.15195 14.0502 3.97845 14.0847 3.80323 14.0847C3.62801 14.0847 3.45451 14.0502 3.29264 13.9831C3.13078 13.916 2.98373 13.8176 2.8599 13.6937C2.73593 13.5698 2.63758 13.4228 2.57049 13.2609C2.50339 13.099 2.46885 12.9255 2.46885 12.7503C2.46885 12.5751 2.50339 12.4016 2.57049 12.2397C2.63758 12.0779 2.73593 11.9308 2.8599 11.807L2.8999 11.767C3.05359 11.6099 3.15669 11.4103 3.1959 11.1941C3.23511 10.9778 3.20864 10.7547 3.1199 10.5537C3.03539 10.3565 2.89507 10.1883 2.71621 10.0699C2.53735 9.95141 2.32776 9.88785 2.11323 9.88699H1.9999C1.64628 9.88699 1.30714 9.74652 1.05709 9.49647C0.807041 9.24642 0.666565 8.90728 0.666565 8.55366C0.666565 8.20004 0.807041 7.8609 1.05709 7.61085C1.30714 7.3608 1.64628 7.22033 1.9999 7.22033H2.0599C2.28056 7.21516 2.49457 7.14374 2.6741 7.01533C2.85363 6.88693 2.99038 6.70748 3.06656 6.50033C3.15531 6.29925 3.18178 6.0762 3.14257 5.85993C3.10336 5.64367 3.00026 5.44411 2.84656 5.28699L2.80656 5.24699C2.6826 5.12316 2.58425 4.97611 2.51715 4.81425C2.45005 4.65238 2.41552 4.47888 2.41552 4.30366C2.41552 4.12844 2.45005 3.95494 2.51715 3.79307C2.58425 3.63121 2.6826 3.48416 2.80656 3.36033C2.9304 3.23636 3.07745 3.13801 3.23931 3.07091C3.40118 3.00381 3.57468 2.96928 3.7499 2.96928C3.92512 2.96928 4.09862 3.00381 4.26049 3.07091C4.42235 3.13801 4.5694 3.23636 4.69323 3.36033L4.73323 3.40033C4.89035 3.55402 5.08991 3.65712 5.30617 3.69633C5.52244 3.73554 5.74549 3.70907 5.94656 3.62033H5.9999C6.19708 3.53582 6.36524 3.3955 6.48369 3.21664C6.60214 3.03778 6.66571 2.82818 6.66656 2.61366V2.50033C6.66656 2.1467 6.80704 1.80756 7.05709 1.55752C7.30714 1.30747 7.64628 1.16699 7.9999 1.16699C8.35352 1.16699 8.69266 1.30747 8.94271 1.55752C9.19276 1.80756 9.33323 2.1467 9.33323 2.50033V2.56033C9.33409 2.77485 9.39765 2.98444 9.5161 3.1633C9.63455 3.34216 9.80272 3.48248 9.9999 3.56699C10.201 3.65574 10.424 3.68221 10.6403 3.643C10.8566 3.60378 11.0561 3.50068 11.2132 3.34699L11.2532 3.30699C11.3771 3.18302 11.5241 3.08468 11.686 3.01758C11.8478 2.95048 12.0213 2.91594 12.1966 2.91594C12.3718 2.91594 12.5453 2.95048 12.7072 3.01758C12.869 3.08468 13.0161 3.18302 13.1399 3.30699C13.2639 3.43082 13.3622 3.57787 13.4293 3.73974C13.4964 3.9016 13.5309 4.0751 13.5309 4.25033C13.5309 4.42555 13.4964 4.59905 13.4293 4.76091C13.3622 4.92278 13.2639 5.06983 13.1399 5.19366L13.0999 5.23366C12.9462 5.39078 12.8431 5.59034 12.8039 5.8066C12.7647 6.02286 12.7912 6.24591 12.8799 6.44699V6.50033C12.9644 6.6975 13.1047 6.86567 13.2836 6.98412C13.4624 7.10257 13.672 7.16614 13.8866 7.16699H13.9999C14.3535 7.16699 14.6927 7.30747 14.9427 7.55752C15.1928 7.80756 15.3332 8.1467 15.3332 8.50033C15.3332 8.85395 15.1928 9.19309 14.9427 9.44313C14.6927 9.69318 14.3535 9.83366 13.9999 9.83366H13.9399C13.7254 9.83451 13.5158 9.89808 13.3369 10.0165C13.1581 10.135 13.0177 10.3031 12.9332 10.5003V10.5003Z" stroke="#E5E6E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs><rect width="16" height="16" fill="white" /></defs>
              </svg>
          </span>
          
          <span>
            {t("advancedOptions")}
          </span>
          
          <svg
            className={classNames(styles.triangle, {
              [styles.upsideDown]: advanced,
            })}
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="#FFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.0163 3L6 7.17206L1.98375 3L0.75 4.28441L6 9.75L11.25 4.28441L10.0163 3Z"></path>
          </svg>
        </span>
      )}
      </div>
      
      
      <div
        className={classNames(styles.tableContainer, {
          [styles.show]: advanced,
        })}
      >
        <div className={styles.parameter}>
          {!props.noApprovalCheckbox ? (
            <div className={styles.infiniteApproval}>
              <CheckboxInput
                checked={infiniteApproval}
                onChange={handleInfiniteApproval}
              />
              <ToolTip content={t("infiniteApprovalTooltip")}>
                <div className={styles.labelLine}>
                  <span className={styles.label}>{t("infiniteApproval")}</span>
                </div>
              </ToolTip>
            </div>
          ) : null}
        </div>
        <div className={styles.parameter}>
          {!props.noSlippageCheckbox ? (
            <div className={styles.inputGroup}>
              <div className={styles.options}>
                <div className={styles.label}>{t("maxSlippage")}: </div>
                <div className={styles.groupButtons}>
                  <button
                    className={classNames({
                      [styles.selected]: slippageSelected === Slippages.OneTenth,
                    })}
                    onClick={() => handleSlippageSelected(Slippages.OneTenth)}
                  >
                    <span>0.1%</span>
                  </button>
                  <button
                    className={classNames({
                      [styles.selected]: slippageSelected === Slippages.One,
                    })}
                    onClick={() => handleSlippageSelected(Slippages.One)}
                  >
                    <span>1%</span>
                  </button>
                  <div className={styles.custom}>
                    <input
                      value={slippageCustom?.valueRaw}
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ): void => {
                        const value = e.target.value
                        if (value && !isNaN(+value)) {
                          handleSlippageCustom(value)
                          if (slippageSelected !== Slippages.Custom) {
                            dispatch(updateSlippageSelected(Slippages.Custom))
                          }
                        } else {
                          dispatch(updateSlippageSelected(Slippages.OneTenth))
                        }
                      }}
                    />
                    <span>%
                      </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
