import React from 'react';
import './_weather.scss';

const changeCase = require('change-case');

class Weather extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
            <img className='navNote__image' src='./images/placeholder.svg' title='Search' />
            <h3> { `${this.props.stateDemo.weather.name}, ${this.props.stateDemo.weather.sys.country}` } </h3>
        </div>
        <div className='col-md-12'>
            <img className='navNote__image' src='./images/cloud.svg' title='Search' />
            <h3> { changeCase.upperCaseFirst(this.props.stateDemo.weather.weather[0].description) } </h3>
            <img className='navNote__image' src='./images/thermometer.svg' title='Search' />
        </div>
        <div className='col-md-12 col__inline'>
            <h3>
                {
                    this.props.stateDemo.weather.main.temp_max==this.props.stateDemo.weather.main.temp_min
                    ? `${((this.props.stateDemo.weather.main.temp_max) * 1.8) - 459.67}`.slice(0,4)+'°F'
                    : `Min: ${((this.props.stateDemo.weather.main.temp_max) * 1.8) - 459.67}`.slice(0,9)+'°F -'+
                    ` Max: ${((this.props.stateDemo.weather.main.temp_min) * 1.8) - 459.67}`.slice(0,11)+'°F'
                }
            </h3>
        </div>
    </div>
    );
  }
}

export default Weather;
