import React from 'react';
import { hot } from 'react-hot-loader';
import Row from './Row';
import requests from './request';
import Banner from './Banner';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        {/* Nav */}
        <Banner />

        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} isLargeRow />
        <Row title='Trending Tomorrow' fetchUrl={requests.fetchTrending} />
        <Row title='Action' fetchUrl={requests.fetchActionMovies} />
        <Row title='Comedy' fetchUrl={requests.fetchComedyMovies} />
        <Row title='Horror' fetchUrl={requests.fetchHorrorMovies} />
        <Row title='Romance' fetchUrl={requests.fetchRomanceMovies} />
        <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />


      </div>
    );
  }
}

export default hot(module)(App);
