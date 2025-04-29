const API_KEY = "1e05979aab883b923c3293c8a6037992"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city, unit) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const fetchForecast = async (city, unit) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
};