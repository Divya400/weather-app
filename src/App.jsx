import { useState, useEffect } from "react";
import { fetchWeather, fetchForecast } from "./utils/api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ErrorMessage from "./components/ErrorMessage";
import WeatherMap from "./components/WeatherMap"; // Ensure this is imported
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
        console.log("Fetching weather for:", city, "with unit:", unit);
        const weather = await fetchWeather(city, unit); // Fetch current weather
        const forecast = await fetchForecast(city, unit); // Fetch 5-day forecast
        console.log("Weather data:", weather);
        console.log("Forecast data:", forecast);
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        console.error("Error fetching weather data:", err.message);
        setError(err.message); // Set error message if API call fails
      }
    };
    loadWeather();
  }, [city, unit]);

  // Fetch weather for user's current location
  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current location:", latitude, longitude);
          try {
            setError(null);
            const weather = await fetchWeather(`${latitude},${longitude}`, unit);
            const forecast = await fetchForecast(`${latitude},${longitude}`, unit);
            console.log("Weather data for current location:", weather);
            setWeatherData(weather);
            setForecastData(forecast);
          } catch (err) {
            console.error("Error fetching weather for current location:", err.message);
            setError("Unable to fetch weather for your location.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          setError("Geolocation permission denied.");
        }
      );
    } else {
      console.error("Geolocation not supported by browser.");
      setError("Geolocation is not supported by your browser.");
    }
  };

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
      {/* Button to fetch current location weather */}
      <button onClick={fetchCurrentLocationWeather} style={{ marginBottom: "1rem" }}>
        Get Current Location Weather
      </button>
      {/* Display error message if any */}
      {error && <ErrorMessage message={error} />}
      {/* Display current weather data */}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {/* Display 5-day forecast */}
      {forecastData && <ForecastList forecastData={forecastData} />}
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