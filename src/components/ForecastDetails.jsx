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

// // STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return (<ReactFC {...chartConfigs} />);
//   }
// }

// export default App;

const ForecastDetails = ({ forecast }) => {
  // console.log(forecast);
  const [openTab, setOpenTab] = useState(1);

  const newForecast = forecast.map((eachday) => {
    let { astro, day, hour } = eachday;

    let newHour = {};

    newHour = hour.map(({ temp_c: value, time: label }) => ({
      label: label.slice(-5),
      value: value.toFixed(0),
    }));

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
                  The Next Day
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
                        value={todayData.newDay.totalprecip_mm}
                        unit="mm"
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
                        value={todayData.newDay.avgvis_km}
                        unit="km"
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
                        value={todayData.newDay.maxwind_kph}
                        unit="km/h"
                      />
                    </>
                  }
                </div>
                <div className="py-2">
                  <ShowChart chartData={[todayData.newHour]} />
                </div>
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
                        value={todayData.astro.moonset}
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
                        value={tomorrowData.newDay.totalprecip_mm}
                        unit="mm"
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
                        value={tomorrowData.newDay.avgvis_km}
                        unit="km"
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
                        value={tomorrowData.newDay.maxwind_kph}
                        unit="km/h"
                      />
                    </>
                  }
                </div>
                <div className="py-2">
                  <ShowChart chartData={[tomorrowData.newHour]} />
                </div>
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
                        value={theNextDayData.newDay.totalprecip_mm}
                        unit="mm"
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
                        value={theNextDayData.newDay.avgvis_km}
                        unit="km"
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
                        value={theNextDayData.newDay.maxwind_kph}
                        unit="km/h"
                      />
                    </>
                  }
                </div>
                <div className="py-2">
                  <ShowChart chartData={[theNextDayData.newHour]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return "There was error fetching foreast data";
};

export default ForecastDetails;
