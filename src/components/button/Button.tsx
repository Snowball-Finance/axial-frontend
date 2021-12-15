import "./Button.scss"

import React, { ReactElement } from "react"

import classNames from "classnames"
import { analytics } from "../../utils/analytics"

type Props = {
  disabled?: boolean
  kind?: "primary" | "secondary" | "ternary" | "cancel" | "temporary"
  visible?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  size?: 'small' | 'medium' | 'large'
}

export default function Button(
  props: React.PropsWithChildren<Props>,
): ReactElement {
  const { kind = "primary", size = 'large', onClick, ...buttonProps } = props

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
    analytics.trackEvent({
      category: "Button",
      action: "click",
      name: `${kind}-${size}-${typeof props.children === "string" ? props.children : "button"}`,
    })
  }

  return (
    <button className={classNames("button", kind, size)} onClick={handleClick} {...buttonProps} />
  )
}
