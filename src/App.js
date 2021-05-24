import React from 'react';
import { hot } from 'react-hot-loader';
import Row from './Row';
import requests from './request';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Row title='Trending Tomorrow' fetchUrl={requests.fetchTrending} />
      </div>
    );
  }
}

export default hot(module)(App);
