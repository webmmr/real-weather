import { useState } from "react";
import defaultBgImage from "../assets/default.png";
import DisplayData from "./DisplayData";
import Search from "./Search";

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

const DisplayWeather = ({ alerts, location, current, forecast }) => {
  const [bgImage, setBgImage] = useState(defaultBgImage);

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section style={bgStyle} className="py-5">
      <div className="container mx-auto px-2 h-screen">
        {/* Current Weather Widget */}
        <div className=" ml-auto max-w-[60%] bg-slate-900 opacity-90 shadow-lg p-8 rounded-[20px]">
          {/* Search Bar */}
          <div className="mb-8">
            <Search />
          </div>
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
                    <h1 className="text-6xl text-slate-100">{current.tempC}</h1>
                    <p className="text-2xl text-slate-100 ml-3">&deg;C</p>
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
            <DisplayData
              icon={<UilCloudWind />}
              title="Wind Speed"
              value={current.windK}
              unit="km/h"
              subtitle={`${current.windDegree}°`}
              sub_text={current.windDir}
            />

            {/* Pressure */}
            <DisplayData
              icon={<UilTemperatureThreeQuarter />}
              title="Pressure"
              value={current.pressureMb}
              unit="mb"
            />

            {/* Humidity*/}
            <DisplayData
              icon={<UilTear />}
              title="Humidity"
              value={current.humidity}
              unit="%"
            />
          </div>
          <div className="flex justify-between items-center">
            {/* Precipitation */}
            <DisplayData
              icon={<UilUmbrella />}
              title="Precipitation"
              value={current.precipMm}
              unit="mm"
            />

            {/* Visibility */}
            <DisplayData
              icon={<UilEye />}
              title="Visibility"
              value={current.visibilityKm}
              unit="km"
            />

            {/* UV Index*/}
            <DisplayData
              icon={<UilBrightnessEmpty />}
              title="UV Index"
              value={current.uvIndex}
              unit=" "
              subtitle={
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
              }
            />
          </div>
          <div className="flex justify-between items-center">
            {/* Cloud Coverage*/}
            <DisplayData
              icon={<UilCloud />}
              title="Cloud Coverage"
              value={current.cloudPercentage}
              unit="%"
            />

            {/* Wind Gusts*/}
            <DisplayData
              icon={<UilWind />}
              title="Wind Gusts"
              value={current.gustK}
              unit="km/h"
            />

            {/* Air Quality Index*/}
            <DisplayData
              icon={<UilWindy />}
              title="Air Quality Index"
              value={current.airQualityIndex}
              unit=""
              subtitle={
                current.airQualityIndex < 20
                  ? "(excellent)"
                  : current.airQualityIndex >= 20 &&
                    current.airQualityIndex < 50
                  ? "(fair)"
                  : current.airQualityIndex >= 50 &&
                    current.airQualityIndex < 99
                  ? "(poor)"
                  : current.airQualityIndex >= 100 &&
                    current.airQualityIndex < 149
                  ? "(unhealthy)"
                  : current.airQualityIndex >= 150 &&
                    current.airQualityIndex < 249
                  ? "(very unhealthy)"
                  : "(dangerous)"
              }
            />
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

export default DisplayWeather;
