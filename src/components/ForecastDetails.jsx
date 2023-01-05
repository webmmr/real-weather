import { useState } from "react";
import DisplayData from "./DisplayData";

import {
  UilSun,
  UilSunset,
  UilMoon,
  UilMoonset,
  UilMoonEclipse,
  UilCloudShowersHeavy,
  UilRaindropsAlt,
  UilTemperature,
  UilCloudWind,
  UilTear,
  UilEye,
} from "@iconscout/react-unicons";
import ShowChart from "./ShowChart";

const ForecastDetails = ({ forecast, isImperial }) => {
  const [openTab, setOpenTab] = useState(1);

  const newForecast = forecast.map((eachday) => {
    let { astro, day, hour } = eachday;

    let newHour = {};
    if (!isImperial) {
      newHour = hour.map(({ temp_c: value, time: label }) => ({
        label: label.slice(-5),
        value: value.toFixed(0),
        date: label,
      }));
    }

    if (isImperial) {
      newHour = hour.map(({ temp_f: value, time: label }) => ({
        label: label.slice(-5),
        value: value.toFixed(0),
        date: label,
      }));
    }

    const { text: condition } = day.condition;

    const {
      totalprecip_in,
      totalprecip_mm,
      avghumidity,
      avgtemp_c,
      avgtemp_f,
      avgvis_km,
      avgvis_miles,
      daily_chance_of_rain,
      daily_chance_of_snow,
      maxwind_kph,
      maxwind_mph,
      ...rest
    } = day;

    const newDay = {
      totalprecip_in: totalprecip_in,
      totalprecip_mm: totalprecip_mm,
      avghumidity: avghumidity,
      avgtemp_c: avgtemp_c,
      avgtemp_f: avgtemp_f,
      avgvis_km: avgvis_km,
      avgvis_miles: avgvis_miles,
      daily_chance_of_rain: daily_chance_of_rain,
      daily_chance_of_snow: daily_chance_of_snow,
      maxwind_kph: maxwind_kph,
      maxwind_mph: maxwind_mph,
      condition,
    };

    return { astro, newDay, newHour };
  });

  const todayData = newForecast[0];
  const tomorrowData = newForecast[1];
  const theNextDayData = newForecast[2];

  if (todayData && tomorrowData && theNextDayData) {
    const newDate = theNextDayData.newHour[0].date;
    const currentDate = new Date(newDate).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <div>
        <div className="container mx-auto mt-5 mb-3">
          <div className="flex flex-col ">
            <ul className="flex space-x-2 justify-center">
              <li>
                <button
                  onClick={() => setOpenTab(1)}
                  className={` ${
                    openTab === 1 ? "bg-white text-slate-800" : "bg-zinc-300"
                  } inline-block px-4 py-2 text-slate-600 rounded shadow`}
                >
                  Today
                </button>
              </li>
              <li>
                <button
                  onClick={() => setOpenTab(2)}
                  className={` ${
                    openTab === 2 ? "bg-white text-slate-800" : "bg-zinc-300"
                  } inline-block px-4 py-2 text-slate-600 rounded shadow`}
                >
                  Tomorrow
                </button>
              </li>
              <li>
                <button
                  onClick={() => setOpenTab(3)}
                  className={` ${
                    openTab === 3 ? "bg-white text-slate-800" : "bg-zinc-300"
                  } inline-block px-4 py-2 text-slate-600  rounded shadow`}
                >
                  {currentDate}
                </button>
              </li>
            </ul>
            <div className=" mt-6">
              <div className={openTab === 1 ? "block" : "hidden"}>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Sunrise */}
                      <DisplayData
                        icon={<UilSun />}
                        title="Sunrise"
                        value={todayData.astro.sunrise}
                      />
                      {/* Sunset */}
                      <DisplayData
                        icon={<UilSunset />}
                        title="Sunset"
                        value={todayData.astro.sunset}
                      />
                      {/* condition */}
                      <DisplayData
                        icon={<UilSunset />}
                        title="Condition"
                        value={todayData.newDay.condition}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Moonrise */}
                      <DisplayData
                        icon={<UilMoon />}
                        title="Moonrise"
                        value={todayData.astro.moonrise}
                      />
                      {/* Moonset */}
                      <DisplayData
                        icon={<UilMoonset />}
                        title="moonset"
                        value={todayData.astro.moonset}
                      />
                      {/* Moon Phase */}
                      <DisplayData
                        icon={<UilMoonEclipse />}
                        title="Moon Phase"
                        value={todayData.astro.moon_phase}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Precipitation */}
                      <DisplayData
                        icon={<UilTear />}
                        title="Precipitation"
                        value={
                          !isImperial
                            ? todayData.newDay.totalprecip_mm
                            : todayData.newDay.totalprecip_in
                        }
                        unit={!isImperial ? "mm" : "in"}
                      />
                      {/* Humidity */}
                      <DisplayData
                        icon={<UilTemperature />}
                        title="Humidity"
                        value={todayData.newDay.avghumidity}
                        unit="%"
                      />
                      {/* Visibility */}
                      <DisplayData
                        icon={<UilEye />}
                        title="Visibility"
                        value={
                          !isImperial
                            ? todayData.newDay.avgvis_km
                            : todayData.newDay.avgvis_miles
                        }
                        unit={!isImperial ? "km" : "miles"}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Chances of Rain */}
                      <DisplayData
                        icon={<UilRaindropsAlt />}
                        title="Chances of Rain"
                        value={todayData.newDay.daily_chance_of_rain}
                        unit="%"
                      />
                      {/* Chances of Snow */}
                      <DisplayData
                        icon={<UilCloudShowersHeavy />}
                        title="Chances of Snow"
                        value={todayData.newDay.daily_chance_of_snow}
                        unit="%"
                      />
                      {/* Wind Speed */}
                      <DisplayData
                        icon={<UilCloudWind />}
                        title="Avg Wind Speed"
                        value={
                          !isImperial
                            ? todayData.newDay.maxwind_kph
                            : todayData.newDay.maxwind_kph
                        }
                        unit={!isImperial ? "km/h" : "miles/h"}
                      />
                    </>
                  }
                </div>

                {openTab === 1 && (
                  <div className="py-2">
                    <ShowChart
                      chartData={[todayData.newHour]}
                      isImperial={isImperial}
                    />
                  </div>
                )}
              </div>
              <div className={openTab === 2 ? "block" : "hidden"}>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Sunrise */}
                      <DisplayData
                        icon={<UilSun />}
                        title="Sunrise"
                        value={tomorrowData.astro.sunrise}
                      />
                      {/* Sunset */}
                      <DisplayData
                        icon={<UilSunset />}
                        title="Sunset"
                        value={tomorrowData.astro.sunset}
                      />
                      {/* condition */}
                      <DisplayData
                        icon={<UilSunset />}
                        title="Condition"
                        value={tomorrowData.newDay.condition}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Moonrise */}
                      <DisplayData
                        icon={<UilMoon />}
                        title="Moonrise"
                        value={tomorrowData.astro.moonrise}
                      />
                      {/* Moonset */}
                      <DisplayData
                        icon={<UilMoonset />}
                        title="moonset"
                        value={tomorrowData.astro.moonset}
                      />
                      {/* Moon Phase */}
                      <DisplayData
                        icon={<UilMoonEclipse />}
                        title="Moon Phase"
                        value={tomorrowData.astro.moon_phase}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Precipitation */}
                      <DisplayData
                        icon={<UilTear />}
                        title="Precipitation"
                        value={
                          !isImperial
                            ? tomorrowData.newDay.totalprecip_mm
                            : tomorrowData.newDay.totalprecip_in
                        }
                        unit={!isImperial ? "mm" : "in"}
                      />
                      {/* Humidity */}
                      <DisplayData
                        icon={<UilTemperature />}
                        title="Humidity"
                        value={tomorrowData.newDay.avghumidity}
                        unit="%"
                      />
                      {/* Visibility */}
                      <DisplayData
                        icon={<UilEye />}
                        title="Visibility"
                        value={
                          !isImperial
                            ? tomorrowData.newDay.avgvis_km
                            : tomorrowData.newDay.avgvis_miles
                        }
                        unit={!isImperial ? "km" : "miles"}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Chances of Rain */}
                      <DisplayData
                        icon={<UilRaindropsAlt />}
                        title="Chances of Rain"
                        value={tomorrowData.newDay.daily_chance_of_rain}
                        unit="%"
                      />
                      {/* Chances of Snow */}
                      <DisplayData
                        icon={<UilCloudShowersHeavy />}
                        title="Chances of Snow"
                        value={tomorrowData.newDay.daily_chance_of_snow}
                        unit="%"
                      />
                      {/* Wind Speed */}
                      <DisplayData
                        icon={<UilCloudWind />}
                        title="Avg Wind Speed"
                        value={
                          !isImperial
                            ? tomorrowData.newDay.maxwind_kph
                            : tomorrowData.newDay.maxwind_kph
                        }
                        unit={!isImperial ? "km/h" : "miles/h"}
                      />
                    </>
                  }
                </div>
                {openTab === 2 && (
                  <div className="py-2">
                    <ShowChart
                      chartData={[tomorrowData.newHour]}
                      isImperial={isImperial}
                    />
                  </div>
                )}
              </div>
              <div className={openTab === 3 ? "block" : "hidden"}>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Sunrise */}
                      <DisplayData
                        icon={<UilSun />}
                        title="Sunrise"
                        value={theNextDayData.astro.sunrise}
                      />
                      {/* Sunset */}
                      <DisplayData
                        icon={<UilSunset />}
                        title="Sunset"
                        value={theNextDayData.astro.sunset}
                      />
                      {/* condition */}
                      <DisplayData
                        icon={<UilSunset />}
                        title="Condition"
                        value={theNextDayData.newDay.condition}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Moonrise */}
                      <DisplayData
                        icon={<UilMoon />}
                        title="Moonrise"
                        value={theNextDayData.astro.moonrise}
                      />
                      {/* Moonset */}
                      <DisplayData
                        icon={<UilMoonset />}
                        title="moonset"
                        value={theNextDayData.astro.moonset}
                      />
                      {/* Moon Phase */}
                      <DisplayData
                        icon={<UilMoonEclipse />}
                        title="Moon Phase"
                        value={theNextDayData.astro.moon_phase}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Precipitation */}
                      <DisplayData
                        icon={<UilTear />}
                        title="Precipitation"
                        value={
                          !isImperial
                            ? theNextDayData.newDay.totalprecip_mm
                            : theNextDayData.newDay.totalprecip_in
                        }
                        unit={!isImperial ? "mm" : "in"}
                      />
                      {/* Humidity */}
                      <DisplayData
                        icon={<UilTemperature />}
                        title="Humidity"
                        value={theNextDayData.newDay.avghumidity}
                        unit="%"
                      />
                      {/* Visibility */}
                      <DisplayData
                        icon={<UilEye />}
                        title="Visibility"
                        value={
                          !isImperial
                            ? theNextDayData.newDay.avgvis_km
                            : theNextDayData.newDay.avgvis_miles
                        }
                        unit={!isImperial ? "km" : "miles"}
                      />
                    </>
                  }
                </div>
                <div className="flex justify-between items-center">
                  {
                    <>
                      {/* Chances of Rain */}
                      <DisplayData
                        icon={<UilRaindropsAlt />}
                        title="Chances of Rain"
                        value={theNextDayData.newDay.daily_chance_of_rain}
                        unit="%"
                      />
                      {/* Chances of Snow */}
                      <DisplayData
                        icon={<UilCloudShowersHeavy />}
                        title="Chances of Snow"
                        value={theNextDayData.newDay.daily_chance_of_snow}
                        unit="%"
                      />
                      {/* Wind Speed */}
                      <DisplayData
                        icon={<UilCloudWind />}
                        title="Avg Wind Speed"
                        value={
                          !isImperial
                            ? theNextDayData.newDay.maxwind_kph
                            : theNextDayData.newDay.maxwind_kph
                        }
                        unit={!isImperial ? "km/h" : "miles/h"}
                      />
                    </>
                  }
                </div>
                {openTab === 3 && (
                  <div className="py-2">
                    <ShowChart
                      chartData={[theNextDayData.newHour]}
                      isImperial={isImperial}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return "There was error fetching foreast data";
};

export default ForecastDetails;
