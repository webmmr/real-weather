import axios from "axios";
import CurrentWeather from "../components/CurrentWeather";

const searchDataApi = (city) => {
  return axios
    .get("http://api.weatherapi.com/v1/search.json", {
      params: {
        key: "77f64c2745ca46eca0962940222712",
        q: city,
      },
    })
    .then(({ data }) => {
      const lat = data[0].lat;
      const lon = data[0].lon;
    })
    .catch((e) => console.log(e));
};

export default searchDataApi;
