import React, { Component } from 'react';
import Header from '../common/header/Header';
import Banner from '../common/banner/Banner';
import Row from './row/Row';
import Footer from '../common/footer/Footer';
import './Movies.css';

export default class Movies extends Component {

  render() {
    const { history, onUser, onSearch } = this.props;
    return (
      <div className='Movies'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <Banner fetchUrl='/api/movies/popular' />
        <Row className="category-row" title='Popular' fetchUrl='/api/movies/popular' />
        <Row className="category-row" title='Action' fetchUrl='/api/movies/genre/28' />
        <Row className="category-row" title='Comedy' fetchUrl='/api/movies/genre/35' />
        <Row className="category-row" title='Horror' fetchUrl='/api/movies/genre/27' />
        <Row className="category-row" title='Romance' fetchUrl='/api/movies/genre/10749' />
        <Row className="category-row" title='Documentaries' fetchUrl='/api/movies/genre/99' />
        <Footer />
      </div>
    );
  }
}
