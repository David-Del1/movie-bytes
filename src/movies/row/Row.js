import React, { Component } from 'react';
import request from 'superagent';
import './Row.css';
import {
  discoverMovies,
  favoritesHandler,
  getMyFavorites,
} from '../../common/utils/movies-api';
import { Link } from 'react-router-dom';

//const URL = 'http://localhost:8001';
const URL = '';

export default class Row extends Component {
  state = {
    movies: [],
    favorites: [],
  };

  async componentDidMount() {
    const { fetchUrl } = this.props;
    this.setState({
      movies: await discoverMovies(fetchUrl),
      favorites: await getMyFavorites(),
    });
  }

  handleFavorite = async (movie, isFavorite) => {
    const { favorites } = this.state;
    this.setState({
      favorites: await favoritesHandler(artwork, isFavorite, favorites),
    });
  };

  render() {
    const { movies, favorites } = this.state;
    const { title } = this.props;
    return (
      <div className='row'>
        <h2>{title}</h2>
        <div className='row_posters'>
          {movies.map((movie, index) => (
            <Link to={`/movies/${movie.movieId}`}>
              <img
                key={movie.movieId}
                className='row_poster'
                src={movie.poster}
                alt={movie.name}
              />
              <button onClick={this.handleClick}>
                {' '}
                {favorites[index] ? '♥️' : '♡'}
              </button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
