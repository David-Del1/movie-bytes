import React, { Component } from 'react';
import Movie from '../movie/Movie';
import './MovieList.css';

export default class MovieList extends Component {
  render() {
    const { title, movies, onUpdate } = this.props;

    // Guard clause
    if(!movies.length) return (
      <div className='MovieList'>
        <h1 className='Title'>
          No movies to show. Please search for a title of your interest!
        </h1>
      </div>
    );

    return (
      <div className='MovieList'>
        {/* semantic content outline, you already have an h1 in the Header */}
        <h2 className='Title'>{title}</h2>

        <ul className='Movies'>
          {movies.map((movie) => (
            <Movie
              key={movie.movieId}
              movie={movie}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      </div>
    );
  }
}
