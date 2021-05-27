import React, { Component } from 'react';
import Header from '../common/header/Header';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import './Movies.css';

export default class Movies extends Component {
  state = { favorites: [] };

  handleFavorite = async (movie, isFavorite) => {
    const { favorites } = this.state;
    this.setState({
      favorites: await favoritesHandler(movie, isFavorite, favorites),
    });
  };

  render() {
    const { history, onUser, onSearch, movies, onFavorited } = this.props;
    return (
      <div className='Movies'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <MovieList movies={movies} onFavorited={onFavorited} />
        <Footer />
      </div>
    );
  }
}
