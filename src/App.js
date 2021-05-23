import React from 'react';
import { hot } from 'react-hot-loader';
import Row from './Row';
import requests from './requests';

class App extends React.Component {

  render() {

    return (
      <div className="App">

        <Row title="ORIGINALS" fetchURL={requests.fetchNetflixOriginals} />
        <Row title="Trending Tomorrow" fetchUrl={requests.fetchTrending} />

      </div>

    )

  }
}

export default hot(module)(App);
