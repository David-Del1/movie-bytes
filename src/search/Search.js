import React, { Component } from 'react';
import Header from '../common/header/Header';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import {
  favoritesHandler,
  getMyFavorites,
} from '../common/utils/movies-api.js';
import './Search.css';

export default class Search extends Component {
  state = {
    movies: [],
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ favorites: await getMyFavorites() });
  }

  handleFavorite = async (movie, isFavorite) => {
    const { movies } = this.state;
    this.setState({
      favorites: await favoritesHandler(movie, isFavorite, favorites),
    });
  };

  render() {
    const { movies, history, onUser, onSearch } = this.props;
    return (
      <div className='Search'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <MovieList movies={movies} onFavorited={this.handleFavorite} />
        <Footer />
      </div>
    );
  }
}
