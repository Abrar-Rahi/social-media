import React, { useEffect, useState } from "react";

const TimeAgo = ({ timestamp }) => {
  const [timeDifference, setTimeDifference] = useState("");

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const givenTime = new Date(timestamp);

      const diffInMs = now - givenTime; // Difference in milliseconds
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Minutes
      const diffInHours = Math.floor(diffInMinutes / 60); // Hours
      const diffInDays = Math.floor(diffInHours / 24); // Days
      const diffInYears = Math.floor(diffInDays / 365); // Years

      // Decide which time unit to display
      if (diffInMinutes < 60) {
        setTimeDifference(`${diffInMinutes}m`);
      } else if (diffInHours < 24) {
        setTimeDifference(`${diffInHours}h`);
      } else if (diffInDays < 365) {
        setTimeDifference(`${diffInDays}d`);
      } else {
        setTimeDifference(`${diffInYears}y`);
      }
    };

    calculateTimeDifference();

    // Optionally update every minute
    const interval = setInterval(calculateTimeDifference, 60000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timestamp]);

  return <div>{timeDifference}</div>;
};

export default TimeAgo;
