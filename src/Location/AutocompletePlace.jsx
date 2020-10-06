import React, { Component } from "react";
import axios from "axios";
import "./autocomplete.css";

export default class AutocompletePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      isLoading: false,
    };
  }

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
      isLoading: true,
    });

    this.props.onLocationChange(e.target.value);

    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 700);
  };

  performSearch = () => {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    } else {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
        )
        .then((response) => {
          this.setState({
            results: response.data.features,
            isLoading: false,
          });
          this.props.manageResults(response.data.features);
        });
    }
  };

  handleItemClicked = (place) => {
    this.setState({
      search: place.place_name,
      results: [],
    });
    this.props.onSelect(place);
  };
  render() {
    return (
      <div>
        <input
          className="AutocompletePlace-input"
          //   ref="AutocompletePlaceInputDOM"
          type="text"
          value={this.state.search}
          onChange={this.handleSearchChange}
          placeholder="Where are you going ?"
        />
        <ul className="AutocompletePlace-results">
          {this.state.results.map((place) => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => this.handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {this.state.isLoading && (
            <li className="AutocompletePlace-items">
              <div id="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
