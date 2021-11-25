import axios from 'axios';
import React, { Component } from 'react';
import config from '../config';

class WeatherReportClass extends Component {
  state = {
    weatherInfo: {
      city: '',
      temperature: ''
    }
  };

  getPosition() {
    return new Promise((resolve, reject) => {
      // get the position
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      })
    });
  };

  async componentDidMount() {
    const position = await this.getPosition();
    const openCageResponse = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          key: config.OPEN_CAGE_APPID,
          q: `${position.coords.latitude}+${position.coords.longitude}`
        }
      },
    );

    const openWeatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          exclude: 'minutely',
          units: 'metric',
          appid: config.OPEN_WEATHER_APPID
        },
      },
    );

    let city = '';
    if (openCageResponse.data.results[0].components.hamlet) {
      city = openCageResponse.data.results[0].components.hamlet;
    } else {
      city = openCageResponse.data.results[0].components.city;
    }

    this.setState({
      weatherInfo: {
        city: city,
        temperature: openWeatherResponse.data.current.temp
      }
    });

  };

  render() {
    return (
      <React.Fragment>
        <div data-cy="weather-display">
          <h1 data-cy="location">{this.state.weatherInfo.city}</h1>
          <h2 data-cy="temp">{`${this.state.weatherInfo.temperature}°C`}</h2>
        </div>
      </React.Fragment>
    )
  };
};

export default WeatherReportClass;
