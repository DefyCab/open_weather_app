import React, { useEffect, useState } from "react";

const WeatherReport = () => {

  const [geolocation, setGeolocation] = useState({});

  const fetchUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(position => { setGeolocation(position.coords) });
  };

  useEffect(() => {
    fetchUserCoordinates();
  }, []);

  return (
    <div>
      <input type="text" value={geolocation.latitude} />
      <input type="text" value={geolocation.longitude} />
    </div>
  );
};

export default WeatherReport;
