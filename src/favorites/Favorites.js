import React, { Component } from 'react';
import Header from '../common/header/Header';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import { getMyFavorites } from '../common/utils/movies-api.js';
import './Favorites.css';

export default class Favorites extends Component {
  state = { favorites: [] };

  async componentDidMount() {
    const token = window.localStorage.getItem('TOKEN');
    this.setState({ favorites: token ? await getMyFavorites() : [] });
  }

  handleUpdate = (movie) => {
    const { favorites } = this.state;
    // find the movie id to delete
    let index = 0;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].movieId === movie.movieId) {
        index = i;
        break;
      }
    }
    // delete the movie from favorites array
    favorites.splice(index, 1);
    this.setState({ favorites });
  };

  render() {
    const { history, onUser, onSearch } = this.props;
    const { favorites } = this.state;
    return (
      <div className='Favorites'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <MovieList movies={favorites} updateFavorites={this.handleUpdate} />
        <Footer />
      </div>
    );
  }
}
