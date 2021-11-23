/* eslint-disable no-undef */
describe("Weather info for user's location", () => {
  
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coord: {
            latitude: 55.7842,
            longitude: 12.4518
          }
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          callback => {
            return callback(stubLocation);
          }
        );
      }
    });
  });
  
  it("is expected to be displayed on initial render", () => {
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "7.8°C");
      cy.get("[data-cy=location]").should("contain", "Fredriksdal");
    });
  });
  
});