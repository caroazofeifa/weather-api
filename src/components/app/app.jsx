import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './_app.scss';

const reactRouter = require('react-router-dom');
const Route = reactRouter.Route;
const AppContainer = require('../../containers/AppContainer');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div id="clouds">
            <div className="cloud x1"></div>      
            <div className="cloud x2"></div>
            <div className='row mainView'>
              <Route path='/' component={ AppContainer } />
            </div>      
          </div>
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById('app'));
