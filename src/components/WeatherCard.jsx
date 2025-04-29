import React from "react";

const WeatherCard = ({ weatherData, unit }) => {
  const { name, main, weather } = weatherData;

  return (
    <div
      className="weather-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "0.5rem",
        textAlign: "center",
        backgroundColor: "white",
      }}
    >
      <h2>{name}</h2>
      <p>
        Temperature: {main.temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p>Condition: {weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
    </div>
  );
};

export default WeatherCard;