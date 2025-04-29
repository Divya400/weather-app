import React from "react";

const WeatherDetail = ({ weatherData }) => {
  const { main, wind } = weatherData;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Details</h3>
      <p>Humidity: {main.humidity}%</p>
      <p>Pressure: {main.pressure} hPa</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDetail;