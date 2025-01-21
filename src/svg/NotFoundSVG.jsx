import React from "react";

const NotFoundSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      width="400" 
      height="400" 
      className="w-full  mx-auto"
    >
      <g fill="none" stroke="#FF2C2C" strokeWidth="2">
        <circle cx="400" cy="300" r="250" />
        <circle cx="400" cy="300" r="200" />
        <circle cx="400" cy="300" r="150" />
        <circle cx="400" cy="300" r="100" />
        <circle cx="400" cy="300" r="50" />
      </g>
      <text
        x="50%"
        y="35%"
        textAnchor="middle"
        fontSize="120"
        fontWeight="bold"
        fill="#FF2C2C"
        className="font-gilroyBold"
      >
        404
      </text>
      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        fontSize="24"
        fill="#FF2C2C"
        className="text-4xl font-gilroyBold text-primary_bg"
      >
        Oops! Page not found.
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontSize="16"
        fill="#6D6D6D"
        className="font-gilroyNormal"
      >
        
      </text>
      <g transform="translate(350,450)">
        <circle cx="50" cy="50" r="50" fill="#FF2C2C" />
        <circle cx="50" cy="50" r="30" fill="#ffffff" />
        <circle cx="50" cy="50" r="15" fill="#FF2C2C" />
      </g>
    </svg>
  );
};

export default NotFoundSVG;
