import React from "react";

const ForecastList = ({ forecastData }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>5-Day Forecast</h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {forecastData.list.slice(0, 5).map((day, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.main.temp}°</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;