import React from 'react';

const changeCase = require('change-case');

class Weather extends React.Component {
  render() {
    console.log(this.props.stateDemo.weather.name);
    return (
      <div>
        <h2> Location: </h2>
        <h3> { this.props.stateDemo.weather.name } </h3>
        <h2> Weather: </h2>
        <h3> { changeCase.upperCaseFirst(this.props.stateDemo.weather.weather[0].description) } </h3>
        <h2> Temperature min: </h2>
        <h3>
            {
                `${((this.props.stateDemo.weather.main.temp_max) * 1.8) - 459.67}°F`
            }
        </h3>
        <h2> Temperature max: </h2>
        <h3>
            {
                `${((this.props.stateDemo.weather.main.temp_min) * 1.8) - 459.67}°F`
            }
        </h3>
      </div>
    );
  }
}

export default Weather;
