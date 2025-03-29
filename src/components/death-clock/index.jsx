import React, { useState, useEffect } from "react";

function DeathClock() {
  const [deathDate, setDeathDate] = useState(null);
  const [inputDate, setInputDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  const handleInputChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputDate) {
      setDeathDate(new Date(inputDate)); // Update death date based on user input
    }
  };

  // Function to calculate the total time difference
  const calculateTimeLeft = () => {
    if (!deathDate) return null;

    const now = new Date();

    // Ensure the deathDate has the current time part (because input date doesn't include time)
    deathDate.setHours(23, 59, 59, 999); // Set target date to the end of the day

    const difference = deathDate - now; // Difference in milliseconds

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Calculate the total remaining days
    const totalDaysLeft = Math.floor(difference / (24 * 3600 * 1000));

    // Calculate the remaining hours, minutes, and seconds
    const remainingHours = Math.floor(
      (difference % (24 * 3600 * 1000)) / (3600 * 1000)
    );
    const remainingMinutes = Math.floor(
      (difference % (3600 * 1000)) / (60 * 1000)
    );
    const remainingSeconds = Math.floor((difference % (60 * 1000)) / 1000);

    // Convert all the time into the desired units
    const totalRemainingHours = totalDaysLeft * 24 + Math.floor(remainingHours);
    const totalRemainingMinutes =
      totalRemainingHours * 60 + Math.floor(remainingMinutes);
    const totalRemainingSeconds =
      totalRemainingMinutes * 60 + Math.floor(remainingSeconds);

    return {
      days: totalDaysLeft,
      hours: Math.floor(totalRemainingHours),
      minutes: Math.floor(totalRemainingMinutes),
      seconds: Math.floor(totalRemainingSeconds),
      totalSecondsLeft: totalRemainingSeconds, // In total seconds, for easy countdown
    };
  };

  // Run the countdown every second
  useEffect(() => {
    if (deathDate) {
      const intervalId = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup the interval when the component unmounts
    }
  }, [deathDate]);

  return (
    <div className="death">
      <h1>Death Clock</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter end date:</label>
        <input type="date" value={inputDate} onChange={handleInputChange} />
        <input type="submit" />
      </form>
      {timeLeft && (
        <div>
          <p>Days left: {timeLeft.days}</p>
          <p>Hours left: {timeLeft.hours}</p>
          <p>Minutes left: {timeLeft.minutes}</p>
          <p>Seconds left: {timeLeft.seconds}</p>
        </div>
      )}
    </div>
  );
}

export default DeathClock;
