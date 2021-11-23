import React, { useEffect, useState } from "react";
import Forecast from "../modules/Forecast";

const WeatherReport = () => {

  const [geolocation, setGeolocation] = useState({});

  // const fetchUserPosition = async () => {
  //   const response = await Forecast.getCurrentPosition();
  //   setUserPosition(response)
  // };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => { setGeolocation(position.coords) });
    debugger;
    //fetchUserPosition();
  });

  return (
    <div>
      <input type="text" value={geolocation.latitude} />
      <input type="text" value={geolocation.longitude} />
    </div>
  );
};

export default WeatherReport;
