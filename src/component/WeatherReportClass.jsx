import axios from 'axios'
import React, { Component } from 'react'
import config from '../config'

class Weatherreportclass extends Component {
  state = {
    geolocation: {},
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords
      const locationResponse = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            key: config.OPEN_CAGE_APPID,
            q: `${latitude}+${longitude}`,
          },
        },
      )
    })
    
    const openWeatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat: latitude,
          lon: longitude,
          exclude: 'minutely',
          units: 'metric',
          appid: config.OPEN_WEATHER_APPID
        },
      },
    )
  }



  render() {
    return <div></div>
  }
}

export default Weatherreportclass
