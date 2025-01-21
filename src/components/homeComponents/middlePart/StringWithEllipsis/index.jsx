import React, { useState } from "react";

const StringWithEllipsis = ({ text, maxLength }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to shorten the text if it exceeds the maxLength
  const shortText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div
      style={{ position: "relative", display: "inline-block", }}
      
      onMouseEnter={() => setIsHovered( true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Display shortened text */}
      {shortText}

      {/* Show full text on hover */}
      { isHovered && (
        <div
          style={{
            position: "absolute",
            color: "#848f95",
            padding: "2px",
            top: "100%", // Adjust positioning based on your needs
            left: "100px",
            whiteSpace: "nowrap",
            zIndex: 100,  
            
          }}
        >
          {text.length > maxLength &&  text}
        </div>
      )}
    </div>
  );
};

export default StringWithEllipsis
