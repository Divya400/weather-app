import React from "react";

const ForecastList = ({ forecastData, unit }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>5-Day Forecast</h3>
      <div
        className="forecast-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {forecastData.list.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className="forecast-item"
            style={{
              flex: "1 1 150px",
              margin: "0.5rem",
              textAlign: "center",
            }}
          >
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>
              {day.main.temp}°{unit === "metric" ? "C" : "F"}
            </p>
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