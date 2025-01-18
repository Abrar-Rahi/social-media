import React from 'react'

const RightArrow = () => {
  return (
    <svg
    fill="#000000"
    width={20}
      height={20}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <line
      x1="3"
      y1="12"
      x2="21"
      y2="12"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    ></line>
    <polyline
      points="18 15 21 12 18 9"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    ></polyline>
  </svg>
  )
}

export default RightArrow


