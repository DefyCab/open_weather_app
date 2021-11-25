import axios from 'axios';
import React, { Component } from 'react';
import config from '../config';
import { Segment, Grid, Header, Icon, Image } from "semantic-ui-react"

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

    const temperature = openWeatherResponse.data.current.temp.toFixed(1)
    const icon = 'https://openweathermap.org/img/wn/' + openWeatherResponse.data.current.weather[0].icon + '.png'
    let description = openWeatherResponse.data.current.weather[0].description
    description = description.charAt(0).toUpperCase() + description.slice(1)

    this.setState({
      weatherInfo: {
        city: city,
        temperature: temperature,
        icon: icon,
        description: description
      }
    });
  };

  render() {
    return (
      <>
        <Segment inverted color="teal">
          <Grid columns={2} divided >
            <Grid.Row data-cy="weather-display">
              <Grid.Column>
                <Header inverted data-cy="location">
                  <Icon name="home" />
                  {this.state.weatherInfo.city}</Header>
                <Header inverted data-cy="temp">
                  <Icon name="thermometer quarter" />
                  {`${this.state.weatherInfo.temperature}°C`}</Header>
              </Grid.Column>
              <Grid.Column>
                <Image src={this.state.weatherInfo.icon} size='mini' />
                <Header inverted data-cy="description" id="weather-description">{this.state.weatherInfo.description}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    )
  };
};

export default WeatherReportClass;
