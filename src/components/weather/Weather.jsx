import React from 'react';
import './_weather.scss';

const changeCase = require('change-case');

class Weather extends React.Component {
  render() {
    return (
    <div>
      <div className='row col__inline'>
        <div className='col-md-3 alingn--end__w'>
        </div>
        <div className='col-md-2 alingn--end__v'>
          <img className='navNote__image' src='./images/placeholder.svg' title='Place' />
        </div>

        <div className='col-md-6 alingn--start'>
          <h3> { `${this.props.stateDemo.weather.name}, ${this.props.stateDemo.weather.sys.country}` } </h3>
        </div>

      </div>

      <div className='row col__inline'>
        <div className='col-md-3 alingn--end__w'>
        </div>
        <div className='col-md-2 alingn--end__w'>
            <img className='navNote__image' src='./images/cloud.svg' title='Weather description' />
        </div>

        <div className='col-md-6 alingn--start'>
            <h3> { changeCase.upperCaseFirst(this.props.stateDemo.weather.weather[0].description) + this.props.stateDemo.takeWithMe } </h3>
        </div>

      </div>

      <div className='row col__inline'>
        <div className='col-md-3 alingn--end__w'>
        </div>
          <div className='col-md-2 alingn--end__w'>
            <img className='navNote__image' src='./images/thermometer.svg' title='Temperature' />
          </div>

          <div className='col-md-6 alingn--start'>
            <h3>
                {
                    this.props.stateDemo.weather.main.temp_max==this.props.stateDemo.weather.main.temp_min
                    ? `${((this.props.stateDemo.weather.main.temp_max) * 1.8) - 459.67}`.slice(0,4)+'°F'
                    : `Max: ${((this.props.stateDemo.weather.main.temp_max) * 1.8) - 459.67}`.slice(0,9)+'°F -'+
                    ` Min: ${((this.props.stateDemo.weather.main.temp_min) * 1.8) - 459.67}`.slice(0,11)+'°F'
                }
            </h3>
          </div>

      </div>
      
    </div>
    );
  }
}

export default Weather;
