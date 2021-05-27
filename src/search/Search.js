import React, { Component } from 'react';
import Header from '../common/header/Header';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import './Search.css';

export default class Movies extends Component {
  render() {
    const { history, onUser, onSearch, movies } = this.props;
    return (
      <div className='Search'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <MovieList movies={movies} updateFavorites={null} />
        <Footer />
      </div>
    );
  }
}
