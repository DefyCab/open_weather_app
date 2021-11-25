import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import WeatherReportClass from "./component/WeatherReportClass";

const App = () => {
  return (
    <Container>
      <Header>
        <Icon  color='teal' name="globe" /> 
        Weather App 
        </Header>
      <WeatherReportClass />
    </Container>
  );
};

export default App;
