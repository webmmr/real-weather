import { useEffect, useState } from "react";
import Searchbar from "./SearchForm";
import overcast from "../assets/overcast.jpg";
import clearNight from "../assets/clear_night.png";
import cloudy from "../assets/cloudy.png";
import heavyRain from "../assets/heavy_rain.png";
import heavySnow from "../assets/heavy_snow.png";
import icePalette from "../assets/ice_palette.png";
import lightRain from "../assets/light_rain.png";
import lightSnow from "../assets/light_snow.png";
import mist from "../assets/mist.png";
import sunny from "../assets/sunny.png";
import thunder from "../assets/thunder.png";
import thunderRain from "../assets/thunder_rain.png";
import thunderSnow from "../assets/thunder_snow.png";

import CurrenWeatherDetails from "./CurrenWeatherDetails";
import ForecastDetails from "./ForecastDetails";

const DisplayWeather = ({ alerts, location, current, forecast, isLoading }) => {
  const [bgImage, setBgImage] = useState(null);
  const [viewForecast, setViewForecast] = useState(false);
  const [imperial, setImperial] = useState(false);

  useEffect(() => {
    if (current.conditionCode === 1000 && current.conditionText === "Clear") {
      setBgImage(clearNight);
    } else if (
      current.conditionCode === 1000 &&
      current.conditionText === "Sunny"
    ) {
      setBgImage(sunny);
    }
    if (
      current.conditionCode === 1003 ||
      current.conditionCode === 1006 ||
      current.conditionCode === 1009
    ) {
      setBgImage(cloudy);
    }

    if (current.conditionCode === 1009) {
      setBgImage(overcast);
    }

    if (
      current.conditionCode === 1030 ||
      current.conditionCode === 1135 ||
      current.conditionCode === 1147
    ) {
      setBgImage(mist);
    }

    if (
      current.conditionCode === 1063 ||
      current.conditionCode === 1072 ||
      current.conditionCode === 1069 ||
      current.conditionCode === 1150 ||
      current.conditionCode === 1153 ||
      current.conditionCode === 1168 ||
      current.conditionCode === 1171 ||
      current.conditionCode === 1180 ||
      current.conditionCode === 1183 ||
      current.conditionCode === 1186 ||
      current.conditionCode === 1189 ||
      current.conditionCode === 1198 ||
      current.conditionCode === 1204 ||
      current.conditionCode === 1240 ||
      current.conditionCode === 1249
    ) {
      setBgImage(lightRain);
    }

    if (
      current.conditionCode === 1192 ||
      current.conditionCode === 1195 ||
      current.conditionCode === 1201 ||
      current.conditionCode === 1207 ||
      current.conditionCode === 1243 ||
      current.conditionCode === 1246 ||
      current.conditionCode === 1252
    ) {
      setBgImage(heavyRain);
    }

    if (current.conditionCode === 1087) {
      setBgImage(thunder);
    }

    if (
      current.conditionCode === 1066 ||
      current.conditionCode === 1114 ||
      current.conditionCode === 1210 ||
      current.conditionCode === 1213 ||
      current.conditionCode === 1216 ||
      current.conditionCode === 1255
    ) {
      setBgImage(lightSnow);
    }

    if (
      current.conditionCode === 1117 ||
      current.conditionCode === 1222 ||
      current.conditionCode === 1225 ||
      current.conditionCode === 1258
    ) {
      setBgImage(heavySnow);
    }

    if (current.conditionCode === 1273 || current.conditionCode === 1276) {
      setBgImage(thunderRain);
    }

    if (current.conditionCode === 1279 || current.conditionCode === 1282) {
      setBgImage(thunderSnow);
    }

    if (
      current.conditionCode === 1237 ||
      current.conditionCode === 1261 ||
      current.conditionCode === 1264
    ) {
      setBgImage(icePalette);
    }
  }, [current.conditionCode, current.conditionText]);

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section style={bgStyle} className="main-section flex items-center">
      <div className="container mx-auto py-8">
        {/* Current Weather Widget */}
        <div className=" max-w-full bg-slate-900 opacity-90 shadow-lg p-8 mx-5 sm:mx-20 rounded-[20px]">
          <div className="mb-2 flex items-center justify-between">
            <Searchbar />
            <button
              className="text-slate-400 underline hover:text-yellow-400 text-sm"
              onClick={() => setImperial(!imperial)}
            >
              {!imperial ? "Imperial" : "Metric"}
            </button>
          </div>
          <div className="mb-0">{/* <Search /> */}</div>
          {/* City & Current time */}
          <div className="flex justify-between items-end pb-4 border-b-2 border-b-slate-700">
            <div>
              <h2 className="text-gray-300 mb-1 text-[13px] font-light">
                Current Location
              </h2>
              <h1 className="text-white text-2xl sm:text-4xl font-semibold">
                {location.city}
              </h1>
              <h2 className="text-gray-300  sm:text-xl font-light">
                {location.country}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-white text-2xl sm:text-4xl font-semibold">
                {location.currentTime}
              </h1>
              <h2 className="text-gray-300 sm:text-xl font-light">
                {location.currentDate}
              </h2>
            </div>
          </div>
          {!viewForecast ? (
            <CurrenWeatherDetails
              alerts={alerts}
              location={location}
              current={current}
              isImperial={imperial}
            />
          ) : (
            <ForecastDetails forecast={forecast} isImperial={imperial} />
          )}
          <div className="flex justify-between">
            <button
              id="forecast-btn"
              className="text-slate-400 hover:text-yellow-400 underline"
              onClick={() => setViewForecast(!viewForecast)}
            >
              {!viewForecast ? "See Forecast" : "See Current Details"}
            </button>
            <p className="text-slate-400">
              Last updated at: {current.lastUpdatedTime}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayWeather;
