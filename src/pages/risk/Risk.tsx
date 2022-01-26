import "./Risk.scss"

import React, { ReactElement } from "react"

import { useTranslation } from "react-i18next"

function Risk(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="riskpage">
      <div className="content">
        <div className="itemInfo">
          <div className="text">
            <h3>{t("risk")}</h3>
            <p data-testid="risk-intro">
              {t("riskIntro")}{" "}
              <a href="https://github.com/Snowball-Finance/axial-protocol">
                {t("riskIntro2")}
              </a>{" "}
              {t("riskIntro3")}
            </p>
          </div>
          <div className="icon">
            <svg
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5932 8.22041L3.65323 36.5004C3.30396 37.1053 3.11916 37.791 3.1172 38.4894C3.11525 39.1879 3.29621 39.8747 3.64208 40.4815C3.98795 41.0883 4.48668 41.5939 5.08864 41.9481C5.69061 42.3023 6.37482 42.4927 7.07323 42.5004H40.9532C41.6516 42.4927 42.3358 42.3023 42.9378 41.9481C43.5398 41.5939 44.0385 41.0883 44.3844 40.4815C44.7302 39.8747 44.9112 39.1879 44.9092 38.4894C44.9073 37.791 44.7225 37.1053 44.3732 36.5004L27.4332 8.22041C27.0767 7.63262 26.5747 7.14665 25.9756 6.80938C25.3766 6.47211 24.7007 6.29492 24.0132 6.29492C23.3258 6.29492 22.6499 6.47211 22.0508 6.80938C21.4518 7.14665 20.9498 7.63262 20.5932 8.22041V8.22041Z"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 18.5V26.5"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 34.5H24.019"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="itemInfo">
          <div className="text">
            <h3>{t("audits")}</h3>
            <p data-testid="risk-audits">
              {t("riskAudits1")}{" "}
              <a href="https://saddle.finance/">{t("riskAudits1LinkTitle")}</a>
              {t("riskAudits2")}{" "}
              <a href="https://github.com/Snowball-Finance/axial-protocol">
                {t("riskAudits2LinkTitle")}
              </a>
              <br />
              {t("riskAudits3")}
              <br />
              {t("riskAudits4")}
            </p>
          </div>
          <div className="icon">
            <svg
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 4.5H12C10.9391 4.5 9.92172 4.92143 9.17157 5.67157C8.42143 6.42172 8 7.43913 8 8.5V40.5C8 41.5609 8.42143 42.5783 9.17157 43.3284C9.92172 44.0786 10.9391 44.5 12 44.5H36C37.0609 44.5 38.0783 44.0786 38.8284 43.3284C39.5786 42.5783 40 41.5609 40 40.5V16.5L28 4.5Z"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 4.5V16.5H40"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 26.5H16"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 34.5H16"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 18.5H18H16"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="itemInfo">
          <div className="text">
            <h3>{t("adminKeys")}</h3>
            <p data-testid="risk-adminkeys">
              {t("riskAdminKeys")}
              <a href="https://snowballs.gitbook.io/snowball-docs/resources/security#2-council">
                {t("riskAdminKeysLinkTitle")}
              </a>
              {t("riskAdminKeys2")}
              <a href="https://snowtrace.io/address/0xfdCcf6D49A29f435E509DFFAAFDecB0ADD93f8C0">
                {t("riskAdminKeys2LinkTitle")}
              </a>
              {t("riskAdminKeys3")}
            </p>
          </div>
          <div className="icon">
            <svg
              width="46"
              height="44"
              viewBox="0 0 46 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.9996 14L36.9996 7M40.9996 3L36.9996 7L40.9996 3ZM21.7796 22.22C22.8123 23.2389 23.6332 24.4521 24.1951 25.7896C24.757 27.1271 25.0488 28.5625 25.0536 30.0133C25.0585 31.464 24.7763 32.9014 24.2234 34.2426C23.6705 35.5838 22.8577 36.8025 21.8319 37.8283C20.806 38.8541 19.5874 39.6669 18.2462 40.2198C16.9049 40.7728 15.4676 41.0549 14.0168 41.0501C12.5661 41.0452 11.1307 40.7534 9.79315 40.1915C8.45565 39.6296 7.24251 38.8087 6.22357 37.776C4.21983 35.7014 3.1111 32.9228 3.13616 30.0386C3.16122 27.1544 4.31808 24.3955 6.35757 22.356C8.39706 20.3165 11.156 19.1596 14.0402 19.1346C16.9243 19.1095 19.7029 20.2183 21.7776 22.222L21.7796 22.22ZM21.7796 22.22L29.9996 14L21.7796 22.22ZM29.9996 14L35.9996 20L42.9996 13L36.9996 7L29.9996 14Z"
                stroke="#EAAB50"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="itemInfo">
          <div className="text">
            <h3>{t("lossOfPeg")}</h3>
            <p data-testid="risk-lossofpeg">{t("riskLossOfPeg")}</p>
          </div>
          <div className="icon">
            <svg
              width="90"
              height="192"
              viewBox="0 0 90 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_235_68911)">
                <g clipPath="url(#clip0_235_68911)">
                  <path
                    d="M53.1039 97.1892C56.3466 92.9844 57.9268 87.7326 57.5429 82.4366C57.1589 77.1406 54.8377 72.1716 51.0225 68.4785C47.2073 64.7855 42.1654 62.6271 36.8598 62.4156C31.5541 62.2041 26.3564 63.9543 22.2594 67.332C18.1623 70.7097 15.4529 75.4781 14.6486 80.7267C13.8444 85.9753 15.0015 91.3363 17.8992 95.7858C20.7969 100.235 25.2319 103.462 30.3575 104.849C35.483 106.236 40.9398 105.686 45.6858 103.305"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M41.5573 104.87C46.6884 103.503 51.1364 100.295 54.0519 95.8569C56.9674 91.419 58.146 86.0628 57.3628 80.811C56.5796 75.5592 53.8894 70.7799 49.8059 67.3858C45.7224 63.9917 40.5318 62.2207 35.2253 62.4109C29.9189 62.6011 24.8684 64.7392 21.0384 68.417C17.2084 72.0947 14.8673 77.0544 14.4621 82.3487C14.0569 87.6431 15.616 92.9013 18.8418 97.119C22.0675 101.337 26.7338 104.219 31.9495 105.214"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M41.9998 76.8008H32.9998C31.8859 76.8008 30.8176 77.1801 30.03 77.8552C29.2423 78.5303 28.7998 79.446 28.7998 80.4008C28.7998 81.3556 29.2423 82.2712 30.03 82.9464C30.8176 83.6215 31.8859 84.0008 32.9998 84.0008H38.9998C40.1137 84.0008 41.182 84.3801 41.9697 85.0552C42.7573 85.7303 43.1998 86.646 43.1998 87.6008C43.1998 88.5556 42.7573 89.4712 41.9697 90.1464C41.182 90.8215 40.1137 91.2008 38.9998 91.2008H28.7998"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36 72V96"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <g clipPath="url(#clip1_235_68911)">
                  <rect
                    x="40"
                    y="79"
                    width="48"
                    height="48"
                    rx="24"
                    fill="#31386B"
                  />
                  <path
                    d="M81.1039 116.189C84.3466 111.984 85.9268 106.733 85.5429 101.437C85.1589 96.1406 82.8377 91.1716 79.0225 87.4785C75.2073 83.7855 70.1654 81.6271 64.8598 81.4156C59.5541 81.2041 54.3564 82.9543 50.2594 86.332C46.1623 89.7097 43.4529 94.4781 42.6486 99.7267C41.8444 104.975 43.0015 110.336 45.8992 114.786C48.7969 119.235 53.2319 122.462 58.3575 123.849C63.483 125.236 68.9398 124.686 73.6858 122.305"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M69.5573 123.87C74.6884 122.503 79.1364 119.295 82.0519 114.857C84.9674 110.419 86.146 105.063 85.3628 99.811C84.5796 94.5592 81.8894 89.7799 77.8059 86.3858C73.7224 82.9917 68.5318 81.2207 63.2253 81.4109C57.9189 81.6011 52.8684 83.7392 49.0384 87.417C45.2084 91.0947 42.8673 96.0544 42.4621 101.349C42.0569 106.643 43.616 111.901 46.8418 116.119C50.0675 120.337 54.7338 123.219 59.9495 124.214"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M64 91V115"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M69.9998 95.8008H60.9998C59.8859 95.8008 58.8176 96.1801 58.03 96.8552C57.2423 97.5303 56.7998 98.446 56.7998 99.4008C56.7998 100.356 57.2423 101.271 58.03 101.946C58.8176 102.621 59.8859 103.001 60.9998 103.001H66.9998C68.1137 103.001 69.182 103.38 69.9697 104.055C70.7573 104.73 71.1998 105.646 71.1998 106.601C71.1998 107.556 70.7573 108.471 69.9697 109.146C69.182 109.821 68.1137 110.201 66.9998 110.201H56.7998"
                    stroke="#EAAB50"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_235_68911"
                  x="0"
                  y="-8"
                  width="126"
                  height="216"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="6" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                  />
                  <feBlend
                    mode="multiply"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_235_68911"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_235_68911"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_235_68911">
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    transform="translate(12 60)"
                  />
                </clipPath>
                <clipPath id="clip1_235_68911">
                  <rect
                    x="40"
                    y="79"
                    width="48"
                    height="48"
                    rx="24"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="itemInfo">
          <div className="text">
            <h3>{t("riskTokenApproval")}</h3>
            <p>
              {t("unnecessaryApprovalAskA")} <br />
              <br />
              <a href="https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729">
                ERC: Token standard · Issue #20 · ethereum/EIPs
              </a>
            </p>
          </div>
          <div className="icon"></div>
        </div>
      </div>
    </div>
  )
}

export default Risk
