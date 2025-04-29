function ForecastItem({ forecast }) {
    const date = new Date(forecast.dt * 1000).toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      hour12: true,
    });
  
    return (
      <div style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
        <p>{date}</p>
        <img
          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          alt={forecast.weather[0].description}
        />
        <p>{forecast.main.temp} °C</p>
        <p>{forecast.weather[0].main}</p>
      </div>
    );
  }
  
  export default ForecastItem;
  