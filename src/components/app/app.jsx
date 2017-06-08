import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const reactRouter = require('react-router-dom');

const Route = reactRouter.Route;
// const Link = reactRouter.Link;
const AppContainer = require('../../containers/AppContainer');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div className='row' id='mainView'>
             <Route path='/' component={ AppContainer } />
          </div>
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById('app'));
