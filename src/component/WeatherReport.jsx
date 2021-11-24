import React, { useEffect, useState } from "react";

const WeatherReport = () => {
  const [geolocation, setGeolocation] = useState({});

  const fetchUserCoordinates = () => {
    // navigator.geolocation.getCurrentPosition(position => { setGeolocation(position.coords) });
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    async fetchAnyData() => {
      const position = await fetchUserCoordinates();
      console.log(position)
    };
  }, []);

  return (
    <div>
      <input type="text" value={geolocation.latitude} />
      <input type="text" value={geolocation.longitude} />
    </div>
  );
};

export default WeatherReport;
