import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherReport = () => {
  const [geolocation, setGeolocation] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({ city: '', temperature: '' });

  const fetchUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
    });
  };

  const fetchGeolocation = async () => {
    const position = await fetchUserCoordinates();
    const openCageResponse = await axios.get('https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          key: "0d816e86fbf44c508de125ee0f992c22",
          q: `${position.coords.latitude}+${position.coords.longitude}`
        }
      });
    setGeolocation(position.coords);
    setWeatherInfo({
      city: openCageResponse.data.results[0].components.city
    })
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

  return (
    <div>
      <input type="text" value={geolocation.latitude} />
      <input type="text" value={geolocation.longitude} />
      <input type="text" value={weatherInfo.city} />
    </div>
  );
};

export default WeatherReport;
