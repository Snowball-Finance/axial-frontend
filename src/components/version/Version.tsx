import React, { ReactElement } from "react"
import styles from "./Version.module.scss"

function Version(): ReactElement | null {
  return (
    <div className={styles.version}>
      VERSION {1.0}
    </div>
  )
}

export default Version
