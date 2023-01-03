import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toFixed(2));
        setLon(position.coords.longitude.toFixed(2));
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  }

  if (lat && lon) {
    return (
      <>
        <Routes>
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/" element={<CurrentWeather lat={lat} lon={lon} />} />
        </Routes>
      </>
    );
  }
}

export default App;
