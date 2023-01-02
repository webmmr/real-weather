import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  }

  if (lat && lon) {
    return <CurrentWeather lat={lat} lon={lon} />;
  }
}

export default App;
