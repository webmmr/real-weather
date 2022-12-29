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
      const cityName = data[0].name;

      <CurrentWeather idiot={`${cityName}`} />;
      console.log("hi");
    });
};

export default searchDataApi;
