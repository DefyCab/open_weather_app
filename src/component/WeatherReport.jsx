import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OPEN_CAGE_APPID from '../openCageID';
import OPEN_WEATHER_APPID from '../openWeatherID';

const WeatherReport = () => {
  const [geolocation, setGeolocation] = useState({})
  const [weatherInfo, setWeatherInfo] = useState({ city: '', temp: '' })

  const fetchUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      })
    })
  }

  const fetchGeolocation = async () => {
    const position = await fetchUserCoordinates()
    const openCageResponse = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          key: OPEN_CAGE_APPID,
          q: `${position.coords.latitude}+${position.coords.longitude}`,
        }
      },
    )
    const openWeatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          exclude: 'minutely',
          units: 'metric',
          appid: OPEN_WEATHER_APPID
        },
      },
    )
    setGeolocation(position.coords)
    setWeatherInfo({
      temp: openWeatherResponse.data.current.temp,
      city: openCageResponse.data.results[0].components.city,
    })
  }

  useEffect(() => {
    fetchGeolocation()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <input type="text" value={weatherInfo.temp} />
      <input type="text" value={geolocation.latitude} />
      <input type="text" value={geolocation.longitude} />
      <input type="text" value={weatherInfo.city} />
    </div>
  )
}

export default WeatherReport
