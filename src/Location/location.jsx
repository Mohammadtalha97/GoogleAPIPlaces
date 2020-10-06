import React, { Component } from "react";
import AutocompletePlace from "./AutocompletePlace";

export default class location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: "",
    };
  }
  handleLocationChange = (place) => {
    this.setState({
      Location: place,
      Latitude: "",
      Longitude: "",
    });
  };
  manageResults = (results) => {
    if (Object.keys(results).length !== 0) {
      this.setState({
        results: results,
      });
    }
  };
  onSelect = (place) => {
    console.log("place", place);
    this.setState({
      Latitude: place.geometry.coordinates[1],
      Longitude: place.geometry.coordinates[0],
      Location: place.place_name,
    });
  };
  render() {
    return (
      <div>
        <AutocompletePlace
          onLocationChange={this.handleLocationChange}
          manageResults={this.manageResults}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
