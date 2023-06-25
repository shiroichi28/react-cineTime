import React, { useState, useEffect } from "react";

function MovieEndTimeCalculator() {
  // State variables to store the current time, user inputs, and calculated end time
  const [time, setTime] = useState(new Date());
  const [currentHours, setCurrentHours] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");
  const [currentSeconds, setCurrentSeconds] = useState("");
  const [movieHours, setMovieHours] = useState("");
  const [movieMinutes, setMovieMinutes] = useState("");
  const [movieSeconds, setMovieSeconds] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    // Update the time every second using setInterval
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Format the time to display hours, minutes, and seconds
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // Function to validate user input for hours, minutes, and seconds
  const validateInput = (value, maxValue) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > maxValue) {
      return false;
    }
    return true;
  };

  // Function to calculate the end time based on user inputs
  const calculateEndTime = () => {
    if (
      validateInput(currentHours, 12) &&
      validateInput(currentMinutes, 60) &&
      validateInput(currentSeconds, 60) &&
      validateInput(movieHours, 12) &&
      validateInput(movieMinutes, 60) &&
      validateInput(movieSeconds, 60)
    ) {
      // Parse user inputs to integers
      const currHours = parseInt(currentHours, 10);
      const currMinutes = parseInt(currentMinutes, 10);
      const currSeconds = parseInt(currentSeconds, 10);
      const movHours = parseInt(movieHours, 10);
      const movMinutes = parseInt(movieMinutes, 10);
      const movSeconds = parseInt(movieSeconds, 10);

      // Calculate current time and movie runtime in seconds
      const currentTimeInSeconds =
        currHours * 3600 + currMinutes * 60 + currSeconds;
      const movieRuntimeInSeconds =
        movHours * 3600 + movMinutes * 60 + movSeconds;

      // Calculate end time in seconds
      const endTimeInSeconds = currentTimeInSeconds + movieRuntimeInSeconds;

      // Calculate end time components (hours, minutes, seconds)
      const endHours = Math.floor(endTimeInSeconds / 3600) % 12 || 12;
      const endMinutes = Math.floor((endTimeInSeconds % 3600) / 60);
      const endSeconds = Math.floor((endTimeInSeconds % 3600) % 60);

      // Format the end time
      const formattedEndTime = `${endHours}:${endMinutes}:${endSeconds}`;
      setEndTime(formattedEndTime);
    } else {
      // If input validation fails, set an error message as the end time
      setEndTime("Invalid input. Please enter valid time values.");
    }
  };

  // Render the component
  return (
    <div className="calc">
      <h1 id="title">Movie End Time Calculator</h1>
      <p id="clock">{formattedTime}</p>
      {/* Input fields for current time */}
      <label htmlFor="currentHours">Time (Hours):</label>
      <input
        type="number"
        id="currentHours"
        value={currentHours}
        min={0}
        max={12}
        onChange={(e) => setCurrentHours(e.target.value)}
      />
      <br />
      <label htmlFor="currentMinutes">Time (Minutes):</label>
      <input
        type="number"
        id="currentMinutes"
        value={currentMinutes}
        min={0}
        max={60}
        onChange={(e) => setCurrentMinutes(e.target.value)}
      />
      <br />
      <label htmlFor="currentSeconds">Time (Seconds):</label>
      <input
        type="number"
        id="currentSeconds"
        value={currentSeconds}
        min={0}
        max={60}
        onChange={(e) => setCurrentSeconds(e.target.value)}
      />
      <br />
      {/* Input fields for movie runtime */}
      <label htmlFor="movieHours">Movie Runtime (Hours):</label>
      <input
        type="number"
        id="movieHours"
        value={movieHours}
        min={0}
        max={12}
        onChange={(e) => setMovieHours(e.target.value)}
      />
      <br />
      <label htmlFor="movieMinutes">Movie Runtime (Minutes):</label>
      <input
        type="number"
        id="movieMinutes"
        value={movieMinutes}
        min={0}
        max={60}
        onChange={(e) => setMovieMinutes(e.target.value)}
      />
      <br />
      <label htmlFor="movieSeconds">Movie Runtime (Seconds):</label>
      <input
        type="number"
        id="movieSeconds"
        value={movieSeconds}
        min={0}
        max={60}
        onChange={(e) => setMovieSeconds(e.target.value)}
      />
      <br />
      {/* Button to trigger end time calculation */}
      <div className="button-container">
        <button onClick={calculateEndTime}>Calculate End Time</button>
      </div>
      {/* Display the calculated end time */}
      <p id="result">End Time: {endTime}</p>
    </div>
  );
}

export default MovieEndTimeCalculator;
