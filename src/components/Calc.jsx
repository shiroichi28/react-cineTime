import React, { useState, useEffect } from "react";

function MovieEndTimeCalculator() {
  const [time, setTime] = useState(new Date());
  const [inputValues, setInputValues] = useState({
    currentHours: "",
    currentMinutes: "",
    currentSeconds: "",
    movieHours: "",
    movieMinutes: "",
    movieSeconds: "",
  });
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
  };

  const calculateEndTime = () => {
    const {
      currentHours,
      currentMinutes,
      currentSeconds,
      movieHours,
      movieMinutes,
      movieSeconds,
    } = inputValues;

    const toSeconds = (hours, minutes, seconds) => {
      return hours * 3600 + minutes * 60 + seconds;
    };

    const currentTimeInSeconds = toSeconds(
      parseInt(currentHours),
      parseInt(currentMinutes),
      parseInt(currentSeconds)
    );

    const movieRuntimeInSeconds = toSeconds(
      parseInt(movieHours),
      parseInt(movieMinutes),
      parseInt(movieSeconds)
    );

    const endTimeInSeconds = currentTimeInSeconds + movieRuntimeInSeconds;

    const formattedHours = (endTimeInSeconds / 3600) % 12 || 12;
    const endMinutes = Math.floor((endTimeInSeconds % 3600) / 60);
    const endSeconds = Math.floor((endTimeInSeconds % 3600) % 60);
    const period = endTimeInSeconds < 43200 ? "AM" : "PM";

    const formattedEndTime = `${formattedHours}:${endMinutes}:${endSeconds}:${period}`;
    setEndTime(formattedEndTime);
  };

  return (
    <div className="calc">
      <h1 id="title">Movie End Time Calculator</h1>
      <p id="clock">{formattedTime}</p>
      {Object.entries(inputValues).map(([id, value]) => (
        <div key={id}>
          <label htmlFor={id}>{id.replace(/([A-Z])/g, " $1")}</label>
          <input
            type="number"
            id={id}
            value={value}
            min={0}
            max={12}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="button-container">
        <button onClick={calculateEndTime}>Calculate End Time</button>
      </div>
      <p id="result">End Time: {isNaN(endTime) ? "Invalid Inputs" : endTime}</p>
    </div>
  );
}

export default MovieEndTimeCalculator;
