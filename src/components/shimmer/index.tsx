/**
 * Shimmer
 */

import React, { FC, ReactNode } from "react"
import "./styles.scss"

const Shimmer: FC<{ height: number; width: number }> = ({ height, width }) => {
  return (
    <div
      className="shimmerLoading"
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  )
}

export const LoadingWrapper: FC<{
  isLoading: boolean
  children: ReactNode
  width: number
  height?: number
}> = ({ isLoading, height = 19, width, children }) => {
  return isLoading ? <Shimmer height={height} width={width} /> : <>{children}</>
}

export default Shimmer
