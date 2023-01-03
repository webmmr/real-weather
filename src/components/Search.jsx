import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import CurrentWeather from "./CurrentWeather";

const Search = () => {
  const { searchTerm } = useParams();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  axios
    .get(`http://api.weatherapi.com/v1/search.json?q=${searchTerm}`, {
      params: {
        key: "77f64c2745ca46eca0962940222712",
      },
    })
    .then(({ data }) => {
      setLat(data[0].lat);
      setLon(data[0].lon);
    })
    .catch((e) => console.log(e));

  if (lat && lon) {
    return <CurrentWeather lat={lat} lon={lon} />;
  }
};

export default Search;
