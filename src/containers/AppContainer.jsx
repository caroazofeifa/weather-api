import React from 'react';
import axios from 'axios';
//import { Route } from 'react-router-dom';
//import { Redirect } from 'react-router';
import Demo from '../components/geolocation/Demo';

const serverNotes = 'http://api.openweathermap.org/data/2.5/forecast?id=3621224&APPID=e5847f111e91d75487366d09345ec504';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
      weather: [],
    };
    this.getAllNotes = this.getAllNotes;
  }
  //will be executed when the component “mounts” (is added to the DOM) for the first time.
  //This method is only executed once during the component’s life.
  componentWillMount() {
    //Get notes with axios from the api
    //this.getAllNotes();
  }
  getAllNotes() {
    axios
      .get(serverNotes)
      .then(res => {
        console.log('DATA');
        this.setState({ weather: res.data });
      });
  }
  updateLatitude(latitudeI) {
    this.setState({ latitude: latitudeI });
  }
  updateLatitude(longitudeI) {
    this.setState({ longitude: longitudeI });
  }
  render() {
    return (
      <div>
        <div className='col-md-1 cols'>
          <h1>HOLI!!</h1>
          <h1> { this.state.latitude } </h1>
          <h1> { this.state.longitude } </h1>
          <Demo
            stateApp={ this.state }
            getAllNotes={ this.getAllNotes.bind(this) }
          />
        </div>
      </div>
    );
  }
}

module.exports = AppContainer;
