import React from "react";
import { Container, Header } from "semantic-ui-react";
import WeatherReport from "./component/WeatherReport";

const App = () => {
  return (
    <Container>
      <Header>Weather App</Header>
      <WeatherReport />
    </Container>
  );
};

export default App;
