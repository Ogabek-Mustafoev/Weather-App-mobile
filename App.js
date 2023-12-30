import { useEffect, useState } from "react";
import { Alert } from "react-native";

import axios from "axios";
import * as Location from "expo-location";

import { Loader, Weather } from "./components";

const API_KEY = "f07bdb7886de571abd13f484212e2963";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async (lat, lon, query = null) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?${query ? `q=${query}` : `lat=${lat}&lon=${lon}`}&appid=${API_KEY}&units=metric`
    );
    setWeatherData(data);
    setIsLoading(false);
  };

  const setWeatherByLocation = city => {
    getWeatherData(null, null, city);
  }

  const getLoacation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      getWeatherData(latitude, longitude, null);
    } catch (error) {
      console.log(error);
      Alert.alert("Couldn't find location!");
    }
  };

  useEffect(() => {
    getLoacation();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Weather
      name={weatherData?.name}
      temp={Math.round(weatherData?.main?.temp)}
      setWeatherByLocation={setWeatherByLocation}
      condition={weatherData?.weather?.[0]?.main}
    />
  )
}