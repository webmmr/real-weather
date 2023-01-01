import { useState } from "react";
import defaultBgImage from "../assets/default.png";

import CurrenWeatherDetails from "./CurrenWeatherDetails";
import ForecastDetails from "./ForecastDetails";

const DisplayWeather = ({ alerts, location, current, forecast }) => {
  const [bgImage, setBgImage] = useState(defaultBgImage);
  const [viewForecast, setViewForecast] = useState(false);

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section style={bgStyle} className="main-section flex items-center">
      <div className="container mx-auto py-8">
        {/* Current Weather Widget */}
        <div className=" max-w-full bg-slate-900 opacity-90 shadow-lg p-8 rounded-[20px]">
          {/* Search Bar */}
          <div className="mb-0">{/* <Search /> */}</div>
          {/* City & Current time */}
          <div className="flex justify-between items-end pb-4 border-b-2 border-b-slate-700">
            <div>
              <h2 className="text-gray-300 mb-1 text-sm font-light">
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

          {!viewForecast ? (
            <CurrenWeatherDetails
              alerts={alerts}
              location={location}
              current={current}
            />
          ) : (
            <ForecastDetails forecast={forecast} />
          )}

          <div className="flex justify-between">
            <button
              id="forecast-btn"
              className="text-slate-400 hover:text-yellow-400"
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
