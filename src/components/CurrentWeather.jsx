import { useEffect, useState } from "react";
import defaultBgImage from "../assets/default.png";

import {
  UilCloudWind,
  UilWind,
  UilWindy,
  UilTemperatureThreeQuarter,
  UilTear,
  UilRaindropsAlt,
  UilUmbrella,
  UilEye,
  UilBrightnessEmpty,
  UilCloudShowersHeavy,
  UilSnowflake,
  UilCloud,
} from "@iconscout/react-unicons";

import currentWeatherData from "../API/CurrentWeatherApi";
import Search from "./Search";

const setDatas = (icon, title, value, unit, subtitle = "", sub_text = "") => {
  return (
    <div className="flex items-center p-3 rounded-lg bg-slate-200 mr-2 mb-4 w-1/3">
      {icon}
      <div className="flex flex-col">
        <p className="text-slate-700 mb-1">{title}</p>
        <h3 className="text-slate-900 text-xl">
          {value} {unit}{" "}
          <span className="text-sm">
            {subtitle} {sub_text}
          </span>
        </h3>
      </div>
    </div>
  );
};

const CurrentWeather = () => {
  const [bgImage, setBgImage] = useState(defaultBgImage);
  const [location, setLocation] = useState([]);
  const [current, setCurrent] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    currentWeatherData()
      .then(({ alerts, currentLocation, currentWeather }) => {
        // console.log(data);
        setAlerts(alerts);
        setLocation(currentLocation);
        setCurrent(currentWeather);
        // setForecast(data.forecast);
      })
      .catch((e) => console.error(e));
  }, []);

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section style={bgStyle} className="py-5">
      <div className="container mx-auto px-2 h-screen">
        {/* Search Bar */}
        <div className="mb-8">
          <Search />
        </div>

        {/* Current Weather Widget */}
        <div className=" ml-auto max-w-[60%] bg-slate-900 opacity-90 shadow-lg p-8 rounded-[20px]">
          {/* City & Current time */}
          <div className="flex justify-between items-end pb-4 border-b-2 border-b-slate-700">
            <div>
              <h2 className="text-gray-300 text-sm font-light">
                Current Location
              </h2>
              <h1 className="text-white text-4xl font-semibold">
                {location.city}
              </h1>
              <h2 className="text-gray-300 text-xl font-light">
                {location.country}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-white text-4xl font-semibold">
                {location.currentTime}
              </h1>
              <h2 className="text-gray-300 text-md font-light">
                {location.currentDate}
              </h2>
            </div>
          </div>
          {/* Current Temp & Condition*/}
          <div className="flex justify-between items-center py-8">
            <div className="flex flex-col">
              <div className="flex items-start">
                <div className="flex flex-col">
                  <div className="flex">
                    <h1 className="text-9xl text-slate-100">{current.tempC}</h1>
                    <p className="text-2xl text-slate-100 mt-3 ml-3">&deg;C</p>
                  </div>
                  <div className="flex items-start">
                    <p className="text-slate-300 mt-1  text-lg">
                      Feels Like: {current.feelsLikeC} &deg;C
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <img
                src={current.conditionIcon}
                alt="condition icon"
                width={70}
              />
              <h1 className="text-white text-xl font-light">
                {current.conditionText} <br />
                {current.conditionCode}
              </h1>
            </div>
          </div>

          {/* Other Properties */}
          <div className="flex justify-between items-center">
            {/* Wind Speed */}
            {setDatas(
              <UilCloudWind
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Wind Speed",
              current.windK,
              "km/h",
              `${current.windDegree}°`,
              current.windDir
            )}

            {/* Pressure */}
            {setDatas(
              <UilTemperatureThreeQuarter
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Pressure",
              current.pressureMb,
              "mb"
            )}

            {/* Humidity*/}
            {setDatas(
              <UilTear
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Humidity",
              current.humidity,
              "%"
            )}
          </div>
          <div className="flex justify-between items-center">
            {/* Precipitation */}
            {setDatas(
              <UilUmbrella
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Precipitation",
              current.precipMm,
              "mm"
            )}

            {/* Visibility */}
            {setDatas(
              <UilEye
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Visibility",
              current.visibilityKm,
              "km"
            )}

            {/* UV Index*/}
            {setDatas(
              <UilBrightnessEmpty
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "UV Index",
              current.uvIndex,
              " ",
              current.uvIndex === 1
                ? "(low)"
                : current.uvIndex === 2
                ? "(low)"
                : current.uvIndex === 3
                ? "(moderate)"
                : current.uvIndex === 4
                ? "(moderate)"
                : current.uvIndex === 5
                ? "(moderate)"
                : current.uvIndex === 6
                ? "(high)"
                : current.uvIndex === 7
                ? "(high)"
                : current.uvIndex === 8
                ? "(very high)"
                : current.uvIndex === 9
                ? "(very high)"
                : current.uvIndex === 10
                ? "(very high)"
                : "(extreme)"
            )}
          </div>
          <div className="flex justify-between items-center">
            {/* Cloud Coverage*/}
            {setDatas(
              <UilCloud
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Cloud Coverage",
              current.cloudPercentage,
              "%"
            )}

            {setDatas(
              <UilWind
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Wind Gusts",
              current.gustK,
              "km/h"
            )}

            {setDatas(
              <UilWindy
                size={40}
                className="bg-slate-300 rounded-full mr-3 p-2"
              />,
              "Air Quality Index",
              current.airQualityIndex,
              "",
              current.airQualityIndex < 20
                ? "(excellent)"
                : current.airQualityIndex >= 20 && current.airQualityIndex < 50
                ? "(fair)"
                : current.airQualityIndex >= 50 && current.airQualityIndex < 99
                ? "(poor)"
                : current.airQualityIndex >= 100 &&
                  current.airQualityIndex < 149
                ? "(unhealthy)"
                : current.airQualityIndex >= 150 &&
                  current.airQualityIndex < 249
                ? "(very unhealthy)"
                : "(dangerous)"
            )}
          </div>

          <div className="flex justify-end">
            <p className="text-slate-400 sleep sleep Open a new tab on Google chrome">
              Last updated at: {current.lastUpdatedTime}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
