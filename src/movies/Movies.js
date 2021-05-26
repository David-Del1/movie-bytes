import React, { Component } from 'react';
import Header from '../common/header/Header';
import Banner from '../common/banner/Banner';
import Row from './row/Row';
import Footer from '../common/footer/Footer';

export default class Movies extends Component {
  state = {
    searchedMovies: [],
  };

  render() {
    const { history, onUser, onSearch } = this.props;
    return (
      <div className='Movies'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <Banner fetchUrl='/api/movies/popular' />
        <Row title='Popular' fetchUrl='/api/movies/popular' />
        <Row title='Action' fetchUrl='/api/movies/genre/28' />
        <Row title='Comedy' fetchUrl='/api/movies/genre/35' />
        <Row title='Horror' fetchUrl='/api/movies/genre/27' />
        <Row title='Romance' fetchUrl='/api/movies/genre/10749' />
        <Row title='Documentaries' fetchUrl='/api/movies/genre/99' />
        <Footer />
      </div>
    );
  }
}
