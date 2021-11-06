import "./infoSection.scss"

import React, { ReactElement } from "react"


interface Props {
  title: string,
  withDivider?: boolean
  rows: {
    title: string, value: string, sub?: string
  }[]
}

function InfoSection({ title, rows, withDivider }: Props): ReactElement | null {

  return (
    <>
      <div className="infoCard">
        <h4>{title}</h4>
        <div className="info">

          {
            rows.map((item, index) => {
              return <div key={index} className="infoItem">
                <span className="label bold">{item.title}</span>
                <span className="value">{item.value}</span>
                {
                  item.sub && <div className="topInfo">
                    <span>
                      {item.sub}
                    </span>
                  </div>
                }
              </div>
            })
          }
        </div>
      </div>
      {withDivider && <div
        className="divider"
      ></div>}
    </>
  )
}

export default InfoSection
