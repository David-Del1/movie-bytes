import React from 'react';
import Row from '../Row';
import Banner from '../Banner';


class MoviesList extends React.Component {
  render() {
    return (
      <div className='MoviesList'>
        <Banner fetchUrl='/api/movies/popular' />
        <Row title='Popular' fetchUrl='/api/movies/popular' />
        <Row title='Action' fetchUrl='/api/movies/genre/28' />
        <Row title='Comedy' fetchUrl='/api/movies/genre/35' />
        <Row title='Horror' fetchUrl='/api/movies/genre/27' />
        <Row title='Romance' fetchUrl='/api/movies/genre/10749' />
        <Row title='Documentaries' fetchUrl='/api/movies/genre/99' />


      </div>
    );
  }
}

export default MoviesList;