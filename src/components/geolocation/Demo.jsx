import React from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

import Weather from '../weather/Weather';
import Selector from '../selector/Selector';
import './_demo.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const serverNotes = 'http://api.openweathermap.org/data/2.5/forecast?id=596826&APPID=e5847f111e91d75487366d09345ec504';
let serverCoord = 'http://api.openweathermap.org/data/2.5/forecast?id=596826&APPID=e5847f111e91d75487366d09345ec504';
let serverNew ='http://api.openweathermap.org/data/2.5/weather?q={city name}&APPID=e5847f111e91d75487366d09345ec504';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeD: 0,
      longitudeD: 0,
      showData: false,
      currentSelected:true,
      selectSelected:false,
      weather: [],
      place:'',
    };
    this.updateCoords = this.updateCoords.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
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
    if(this.state.currentSelected){
      axios
        .get(serverCoord)
        .then(res => {
          this.setState({ weather: res.data });
          this.setState({ showData: true });
        });
    }
    else{
      console.log('Vamo a consultar el nuevo');
      serverNew =`http://api.openweathermap.org/data/2.5/weather?q=${this.state.place}&APPID=e5847f111e91d75487366d09345ec504`;
      console.log(serverNew);
      axios
        .get(serverNew)
        .then(res => {
          this.setState({ weather: res.data });
          this.setState({ showData: true });
        })
        .catch(res => {
          console.log('ERROR');
          this.setState({ showData: false });
        });
    }
  }
  handleClick(e) {
    console.log('Clicked at position', e.latLng);
    var x = e.clientX + iframepos.left; 
    var y = e.clientY + iframepos.top;
    console.log(x + ' ' + y);
  }
  setLocation(event) {
    if(event.target.value =='CURRENT' ) {
      this.setState({ selectSelected: false });
      this.setState({ currentSelected: true });
    } else {
        if(event.target.value =='SELECT' ) {
          this.setState({ selectSelected: true });
          this.setState({ currentSelected: false });
        }
    }
    this.setState({ place: '' });
  }
  updatePlace(placeI) {
    this.setState({ place: placeI });
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
            serverCoord = `http://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&APPID=e5847f111e91d75487366d09345ec504`
            )
        : <div>Getting the location data&hellip; </div>;
    return (
      <div>
        {/*<h2> { this.state.latitudeD } </h2>
        <h2> { this.state.longitudeD } </h2>*/}
        <div className='row'>
          <div className='col-md-12'>
            <h3> Location: </h3>
            <form action='' >
              <div className='row'>
                <div className='col-md-12' >
                  <input type="radio" value="CURRENT" name="gender" checked={this.state.currentSelected} onChange={ this.setLocation }/> Current
                  <input type="radio" value="SELECT" name="gender" onChange={ this.setLocation }/> Select
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            { this.state.selectSelected ? <Selector stateDemo={ this.state } updatePlace={ this.updatePlace.bind(this) } updateCoords= { this.updateCoords.bind(this) } /> : <div className='row'></div> }
          </div>
        </div>
        <div className='row'>
          <button className='button__demo' href='#' onClick={ this.updateCoords } > How is the weather? </button>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            {/*{ this.state.showData ? <Weather stateDemo={ this.state } /> : <div className='row'></div> }*/}
            { this.state.showData ? <Weather stateDemo={ this.state } /> : <div className='row'><h3> No data to show</h3></div> }
          </div>
        </div>
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
