import React from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

const serverNotes = 'http://api.openweathermap.org/data/2.5/forecast?id=596826&APPID=e5847f111e91d75487366d09345ec504';

let serverC = 'http://api.openweathermap.org/data/2.5/forecast?id=596826&APPID=e5847f111e91d75487366d09345ec504';
//const serverCoord='http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}'
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeD: 0,
      longitudeD: 0,
      weather: [],
    };
    this.updateCoords = this.updateCoords.bind(this);
  }
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
  updateCoords() {
    console.log('axios!!!!!!!!!!call');
    // const la = this.state.latitudeD;
    // const lo = this.state.longitudeD;
    // const serverC = `http://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}`;
    axios
      .get(serverC)
      .then(res => {
        console.log(serverC);
        console.log(res.data);
        this.setState({ weather: res.data });
      });
    // this.props.updateLatitude(this.state.latitudeD);
    // this.props.updateLongitude(this.state.longitudeD);
  }
  render() {
    !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
        : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ?
            (
            this.state.latitudeD = this.props.coords.latitude,
            this.state.longitudeD = this.props.coords.longitude,
            serverC = `http://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&APPID=e5847f111e91d75487366d09345ec504`
            )
        : <div>Getting the location data&hellip; </div>;
    return (
      <div>
        <h2> { this.state.latitudeD } </h2>
        <h2> { this.state.longitudeD } </h2>
        <button onClick={ this.updateCoords } />
        <h1>Bye</h1>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);
