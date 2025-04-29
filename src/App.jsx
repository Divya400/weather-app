import { useState, useEffect } from "react";
import { fetchWeather, fetchForecast } from "./utils/api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ErrorMessage from "./components/ErrorMessage";
import WeatherMap from "./components/WeatherMap";
import './App.css';

function App() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric"); // State for temperature unit (Celsius or Fahrenheit)
  const [darkMode, setDarkMode] = useState(false); // State for dark/light mode
  const [recentSearches, setRecentSearches] = useState([]); // State for recent searches

  // Handle city search
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    setRecentSearches((prev) => [...new Set([searchCity, ...prev])].slice(0, 5)); // Save recent searches
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Fetch weather and forecast data whenever city or unit changes
  useEffect(() => {
    const loadWeather = async () => {
      try {
        setError(null); // Clear previous errors
        const weather = await fetchWeather(city, unit); // Fetch current weather
        const forecast = await fetchForecast(city, unit); // Fetch 5-day forecast
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        setError(err.message); // Set error message if API call fails
      }
    };
    loadWeather();
  }, [city, unit]); // Dependency array includes city and unit

  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <h1>Weather App</h1>
      {/* Dark/Light mode toggle */}
      <button onClick={toggleDarkMode} style={{ marginBottom: "1rem" }}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
      {/* Search bar for entering city name */}
      <SearchBar onSearch={handleSearch} />
      {/* Button to toggle between Celsius and Fahrenheit */}
      <button onClick={toggleUnit} style={{ marginBottom: "1rem" }}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      {/* Display error message if any */}
      {error && <ErrorMessage message={error} />}
      {/* Display current weather data */}
      {weatherData && <WeatherCard weatherData={weatherData} unit={unit} />}
      {/* Display 5-day forecast */}
      {forecastData && <ForecastList forecastData={forecastData} unit={unit} />}
      {/* Display map view */}
      {weatherData && (
        <WeatherMap
          lat={weatherData.coord.lat}
          lon={weatherData.coord.lon}
          city={weatherData.name}
        />
      )}
      {/* Display recent searches */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => handleSearch(search)} style={{ cursor: "pointer" }}>
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;