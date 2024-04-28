import React, { useState } from "react";
import "./weatherPage.css";

function WeatherPage() {
  const [weatherData, setWeatherData] = useState("");
  const [location, setLocation] = useState("");

  const fetchData = async () => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e94203882f1068d1f5dfefcbb4d365cd`;
    try {
      const fetchedData = await fetch(apiURL);
      const response = await fetchedData.json();
      setWeatherData(response);
    } catch (error) {
      throw new Error("Unable to fetch the weather data:", error);
    }
    setLocation('');
  };

  return (
    <div className="weatherpage-container">
      <div className="weather-app-heading">
        <img src="./Images/weather-icon.svg" alt="app-icon" />
        <h1>WeatherForecast</h1>
      </div>

      <div className="search-weather">
        <input
          type="text"
          placeholder="Type the city here..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchData}>Show</button>
      </div>

      <div className="city-name">
        <h1>
          {weatherData?.name ? weatherData?.name?.toUpperCase() : 'City'}, {weatherData?.sys ? weatherData?.sys?.country : 'Country'}
        </h1>
      </div>

      <div className="city-weather-forecast">   
        {weatherData.weather ? <h1>{weatherData?.weather[0]?.main}</h1> : '--'}
      </div>

      <div className="weather-information">
        <div className="city-temperature">
          <h1>Temperature</h1>
          <h2>{weatherData?.main ? weatherData?.main?.temp : '--'} °F</h2>
        </div>

        <div className="city-feels-like-temp">
          <h1>Feels Like</h1>
          <h2>{weatherData?.main ? weatherData?.main?.feels_like : '--'} °F</h2>
        </div>

        <div className="city-humidity">
          <h1>Humidity</h1>
          <h2>{weatherData?.main ? weatherData?.main?.humidity : '--'} %</h2>
        </div>

        <div className="city-wind-speed">
          <h1>Wind Speed</h1>
          <h2>{weatherData?.wind ? weatherData?.wind?.speed : '--'} MPH</h2>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
