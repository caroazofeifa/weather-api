import React from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

import Weather from '../components/weather/Weather';
import Selector from '../components/selector/Selector';
import * as CONST from '../constants/Constants';
import './_demo.scss';

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
      buttonDemo:'button__demo',
      cloth: CONST.QUESTION,
      takeWithMe:'',
    };
    this.updateCoords = this.updateCoords.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
    this.checkCloth = this.checkCloth.bind(this);
  }
  componentWillMount() {
    //Get notes with axios from the api
    //this.getAllNotes();
  }
  getAllNotes() {
    axios
      .get(serverNotes)
      .then(res => {
        this.setState({ weather: res.data });
      });
  }
  updateCoords() {
    this.setState({ cloth: '' });
    if(this.state.currentSelected){
      console.log(serverCoord);
      axios
        .get(serverCoord)
        .then(res => {
          this.setState({ weather: res.data });
          this.setState({ showData: true });
          this.checkCloth();
        });
    }
    else{
      serverNew =`${CONST.SERVER}q=${this.state.place}&${CONST.API_KEY}`;
      axios
        .get(serverNew)
        .then(res => {
          this.setState({ weather: res.data });
          this.setState({ showData: true });
          this.checkCloth();
        })
        .catch(res => {
          console.log('ERROR');
          this.setState({ showData: false });
          this.setState({ cloth: CONST.QUESTION });
        });
    }
  }
  setLocation(event) {
    if(event.target.value ==CONST.CURRENT ) {
      this.setState({ selectSelected: false });
      this.setState({ currentSelected: true });
      this.setState({ buttonDemo: CONST.BTN });
    } else {
        if(event.target.value ==CONST.SELECT ) {
          this.setState({ selectSelected: true });
          this.setState({ currentSelected: false });
          this.setState({ buttonDemo: CONST.BTN_S });
        }
    }
    this.setState({ place: '' });
  }
  updatePlace(placeI) {
    this.setState({ place: placeI });
  }
  checkCloth() {
    const temp_max = this.state.weather.main.temp_max;
    const temp_min = this.state.weather.main.temp_min;
    const temp_prom= (((temp_max+temp_min)/2)  * 1.8) - 459.67;
    const desc = this.state.weather.weather[0].description
    if(temp_prom<32){//termical cloth
      this.setState({ cloth: CONST.SUG1 });
    } else{
      if(temp_prom >32 && temp_prom<50) {//scarf, abrigo, guantes orejeras
        this.setState({ cloth: CONST.SUG2 });
      } else {
        if(temp_prom >50 && temp_prom<68) {
          this.setState({ cloth: CONST.SUG3 });
        } else {
          if(temp_prom >68 && temp_prom<86){
            this.setState({ cloth: CONST.SUG4 });
          } else {
            if(temp_prom >86) {
              this.setState({ cloth: CONST.SUG5 });
            }
          }
        }
      }
    }
    if(desc.indexOf(CONST.RAIN)>=0){
      this.setState({ takeWithMe: CONST.UMBRELLA });
    } else {
      if(desc.indexOf(CONST.CLEAR)>=0 || desc.indexOf(CONST.SUN)>=0){
        this.setState({ takeWithMe: CONST.CAP });
      }
    }
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
            //this.setState({});
            )
        : <div>Getting the location data&hellip; </div>;
    return (
      <div className='demo'>
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
          <button className={this.state.buttonDemo} href='#' onClick={ this.updateCoords } > Check the weather </button>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            { this.state.showData ? <Weather stateDemo={ this.state } /> : <div className='row'><h3></h3></div> }
          </div>
        </div>
        <div className='row col__inline col--margin'>
          <div className='col-md-2 alingn--end'>
            <img className='navNote__image' src='./images/light-bulb.svg' title='Search' />
            </div>
            <div className='cpl-md-10'>
            <h3>{this.state.cloth}</h3>
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
