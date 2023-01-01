// https://api.weatherapi.com/v1/current.json?key=77f64c2745ca46eca0962940222712&q=Dhaka&aqi=yes

import axios from "axios";

const currentWeatherData = (lat = 49, lon = 10) => {
  return axios
    .get(`https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}`, {
      params: {
        key: "77f64c2745ca46eca0962940222712",
        aqi: "yes",
        days: 3,
        alerts: "yes",
      },
    })
    .then(({ data }) => {
      // return data;
      return {
        alerts: parseAlert(data),
        currentLocation: parseCurrentLocation(data),
        currentWeather: pareseCurrentWeather(data),
        forecast: parseForecast(data),
      };
    });
};

function parseAlert({ alerts }) {
  if (alerts.length > 0) {
    const currentAlert = alerts.alert[0].desc;
    return currentAlert;
  } else return "There is no weather alert at the moment";
}
function parseCurrentLocation({ location }) {
  const [date, time] = location.localtime.split(" ");
  const [hour, minute] = time.split(":");

  const currentTime = `${hour <= 12 ? hour : hour - 12}:${minute} ${
    hour <= 12 ? "AM" : "PM"
  }`;

  const currentDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { name: city, country } = location;

  return {
    city,
    country,
    currentDate,
    currentTime,
  };
}

function pareseCurrentWeather({ current }) {
  const { pm10: airQualityIndex } = current.air_quality;
  const {
    text: conditionText,
    code: conditionCode,
    icon: conditionIcon,
  } = current.condition;

  const time = current.last_updated.slice(-5);
  const [hour, minute] = time.split(":");

  const lastUpdatedTime = `${hour <= 12 ? hour : hour - 12}:${minute} ${
    hour <= 12 ? "AM" : "PM"
  }`;

  const {
    cloud: cloudPercentage,
    feelslike_c: feelsLikeC,
    feelslike_f: feelsLikeF,
    gust_kph: gustK,
    gust_mph: gustM,
    humidity,
    is_day: isDay,
    precip_in: precipIn,
    precip_mm: precipMm,
    pressure_in: pressureIn,
    pressure_mb: pressureMb,
    temp_c: tempC,
    temp_f: tempF,
    uv: uvIndex,
    vis_km: visibilityKm,
    vis_miles: visibilityMiles,
    wind_degree: windDegree,
    wind_dir: windDir,
    wind_kph: windK,
    wind_mph: windM,
  } = current;

  return {
    airQualityIndex: Math.ceil(airQualityIndex),
    conditionText,
    conditionCode,
    conditionIcon,
    lastUpdatedTime,
    cloudPercentage,
    feelsLikeC,
    feelsLikeF,
    gustK,
    gustM,
    humidity,
    isDay,
    precipIn,
    precipMm,
    pressureIn,
    pressureMb,
    tempC,
    tempF,
    uvIndex,
    visibilityKm,
    visibilityMiles,
    windDegree,
    windDir,
    windK,
    windM,
  };
}

function parseForecast({ forecast }) {
  const forecastDays = forecast.forecastday;
  const newForecastArray = [];
  forecastDays.map((forecastDay, index) => {
    // console.log(forecastDay);
    const { date, date_epoch, ...newForecastDay } = forecastDay;
    newForecastArray.push(newForecastDay);
  });

  return newForecastArray;
}

export default currentWeatherData;
