import React from 'react';
import './_selector.scss';


class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
  }
  handleChange(event) {
    const title = event.currentTarget.value;
    this.props.updatePlace(title);
  }
   handleKeyPress(event) {
    if (event.key === 'Enter') {
      console.log('enter');
      const title = event.currentTarget.value;
      this.props.updatePlace(title);
      this.props.updateCoords();
    }
  }
  render() {
    const { place } = this.props.stateDemo;
    return (
      <div className='row'>
        <input className='selector__input' id='nameNote' type='text' placeholder='ex: Toronto' value={ place } onChange={ this.handleChange } onKeyDown={ this.handleKeyPress } />
    </div>
    );
  }
}

export default Selector;
