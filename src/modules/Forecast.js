const Forecast = {

  async getCurrentPosition() {
    const response = await window.navigator.geolocation
      .getCurrentPosition(position => position.coords);

    debugger
    return response;
  }

};

export default Forecast;