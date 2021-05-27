import React, { Component } from 'react';
import Movie from '../movie/Movie';
import './MovieList.css';

export default class MovieList extends Component {
  render() {
    const { movies, onFavorited } = this.props;
    return movies.length > 0 ? (
      <ul className='MovieList'>
        {movies.map((movie) => (
          <Movie
            key={movie.movieId}
            movie={movie}
            isFavorite={false}
            onFavorited={onFavorited}
          />
        ))}
      </ul>
    ) : (
      <h2>No movies to show. Please search for a title of your interest!</h2>
    );
  }
}
