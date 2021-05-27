import React, { Component } from 'react';
import MovieList from '../../common/movie-list/MovieList';
import { discoverMovies } from '../../common/utils/movies-api.js';
import './Row.css';

export default class Row extends Component {

  state = {
    movies: [],
    favorites: [],
  };

  async componentDidMount() {
    const { fetchUrl } = this.props;
    this.setState({ movies: await discoverMovies(fetchUrl) });
  }

  handleFavorite = async (movie, isFavorite) => {
    const { movies } = this.state;
    this.setState({
      favorites: await favoritesHandler(movie, isFavorite, favorites),
    });
  };
  render() {
    const { movies } = this.state;
    const { title } = this.props;
    return (
      <div className='row'>
        <h2>{title}</h2>
        <MovieList movies={movies} onFavorited={this.handleFavorite} />
      </div>
    );
  }
}
