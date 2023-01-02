import { useEffect, useState } from "react";
import currentWeatherData from "../API/currentWeatherApi";
import DisplayWeather from "./DisplayWeather";

function CurrentWeather({ lat, lon }) {
  const [location, setLocation] = useState([]);
  const [current, setCurrent] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    currentWeatherData(lat, lon)
      .then(({ alerts, currentLocation, currentWeather, forecast }) => {
        // console.log(data);
        setAlerts(alerts);
        setLocation(currentLocation);
        setCurrent(currentWeather);
        setForecast(forecast);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <DisplayWeather
      alerts={alerts}
      location={location}
      current={current}
      forecast={forecast}
    />
  );
}

export default CurrentWeather;
