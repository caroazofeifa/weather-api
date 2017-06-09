import React from 'react';
import axios from 'axios';

import Demo from './Demo';

const serverNotes = 'http://api.openweathermap.org/data/2.5/forecast?id=596826&APPID=e5847f111e91d75487366d09345ec504';


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      weather: [],
    };
    this.getAllNotes = this.getAllNotes;
    this.updateLatitude = this.updateLatitude;
    this.updateLongitude = this.updateLongitude;
    this.updateWeather = this.updateWeather;
  }
  //will be executed when the component “mounts” (is added to the DOM) for the first time.
  //This method is only executed once during the component’s life.
  componentWillMount() {
    //Get notes with axios from the api
    this.getAllNotes();
  }
  getAllNotes() {
    axios
      .get(serverNotes)
      .then(res => {
        this.setState({ weather: res.data });
      });
  }
  updateLatitude(latitudeI) {
    this.setState({ latitude: latitudeI });
  }
  updateLongitude(longitudeI) {
    this.setState({ longitude: longitudeI });
  }
  updateWeather(weatherI) {
    this.setState({ weather: weatherI });
  }
  render() {
    return (
      <div>
        <div className='col-md-12'>
          <Demo
            stateApp={ this.state }
            getAllNotes={ this.getAllNotes.bind(this) }
            updateLatitude={ this.updateLatitude.bind(this) }
            updateLongitude={ this.updateLongitude.bind(this) }
            updateWeather={ this.updateWeather.bind(this) }
          />
        </div>
      </div>
    );
  }
}

module.exports = AppContainer;
