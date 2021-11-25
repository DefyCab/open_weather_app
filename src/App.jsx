import React from "react";
import { Container, Header } from "semantic-ui-react";
import WeatherReportClass from "./component/WeatherReportClass";

const App = () => {
  return (
    <Container>
      <Header>Weather App</Header>
      <WeatherReportClass />
    </Container>
  );
};

export default App;
