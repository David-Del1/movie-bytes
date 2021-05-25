import React from 'react';
import Row from '../Row';
import requests from '../request';

class MoviesList extends React.Component {
  render() {
    return (
      <div className='MoviesList'>
        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
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

export default MoviesList;