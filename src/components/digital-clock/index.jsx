import React, { useEffect, useState } from "react";
import "./clock.css";
function DigitalClock() {
  const [date, setDate] = useState(new Date());
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="clock">
      <h1>Digital Clock</h1>

      <div>
        <span>{date.getHours().toString().padStart(2, "0")}</span>:
        <span>{date.getMinutes().toString().padStart(2, "0")}</span>:
        <span>{date.getSeconds().toString().padStart(2, "0")}</span>
      </div>
      <div>
        {date.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}

export default DigitalClock;
