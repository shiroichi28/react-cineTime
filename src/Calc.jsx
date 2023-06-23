import React, { useState, useEffect } from "react";
function MovieEndTimeCalculator() {
  const [time, setTime] = useState(new Date());
  const [currentHours, setCurrentHours] = useState();
  const [currentMinutes, setCurrentMinutes] = useState();
  const [currentSeconds, setCurrentSeconds] = useState();
  const [movieHours, setMovieHours] = useState("");
  const [movieMinutes, setMovieMinutes] = useState("");
  const [movieSeconds, setMovieSeconds] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the time to display hours, minutes, and seconds
  const formattedTime = time.toLocaleTimeString();
  const calculateEndTime = () => {
    // Convert input values to integers
    const currHours = parseInt(currentHours);
    const currMinutes = parseInt(currentMinutes);
    const currSeconds = parseInt(currentSeconds);
    const movHours = parseInt(movieHours);
    const movMinutes = parseInt(movieMinutes);
    const movSeconds = parseInt(movieSeconds);

    // Convert everything to seconds
    const currentTimeInSeconds =
      currHours * 3600 + currMinutes * 60 + currSeconds;
    const movieRuntimeInSeconds =
      movHours * 3600 + movMinutes * 60 + movSeconds;

    // Calculate end time
    const endTimeInSeconds = currentTimeInSeconds + movieRuntimeInSeconds;

    // Convert end time back to hours, minutes, and seconds
    const endHours = Math.floor(endTimeInSeconds / 3600);
    const endMinutes = Math.floor((endTimeInSeconds % 3600) / 60);
    const endSeconds = Math.floor((endTimeInSeconds % 3600) % 60);

    // Format the end time as a string
    const formattedEndTime = `${endHours}:${endMinutes}:${endSeconds}`;

    // Set the calculated end time
    setEndTime(formattedEndTime);
  };

  return (
    <div className="calc">
      <h1 id="title">Movie End Time Calculator</h1>
      <p id="clock">{formattedTime}</p>
      <label htmlFor="currentHours">Time (Hours):</label>
      <input
        type="number"
        id="currentHours"
        value={currentHours}
        onChange={(e) => setCurrentHours(e.target.value)}
      />
      <br />
      <label htmlFor="currentMinutes">Time (Minutes):</label>
      <input
        type="number"
        id="currentMinutes"
        value={currentMinutes}
        onChange={(e) => setCurrentMinutes(e.target.value)}
      />
      <br />
      <label htmlFor="currentSeconds">Time (Seconds):</label>
      <input
        type="number"
        id="currentSeconds"
        value={currentSeconds}
        onChange={(e) => setCurrentSeconds(e.target.value)}
      />
      <br />
      <label htmlFor="movieHours">Movie Runtime (Hours):</label>
      <input
        type="number"
        id="movieHours"
        value={movieHours}
        onChange={(e) => setMovieHours(e.target.value)}
      />
      <br />
      <label htmlFor="movieMinutes">Movie Runtime (Minutes):</label>
      <input
        type="number"
        id="movieMinutes"
        value={movieMinutes}
        onChange={(e) => setMovieMinutes(e.target.value)}
      />
      <br />
      <label htmlFor="movieSeconds">Movie Runtime (Seconds):</label>
      <input
        type="number"
        id="movieSeconds"
        value={movieSeconds}
        onChange={(e) => setMovieSeconds(e.target.value)}
      />
      <br />
      <div className="button-container">
        <button onClick={calculateEndTime}>Calculate End Time</button>
      </div>
      <p id="result">End Time: {endTime}</p>
    </div>
  );
}

export default MovieEndTimeCalculator;
