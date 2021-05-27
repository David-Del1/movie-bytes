import React, { Component } from 'react';
import Movie from '../movie/Movie';
import './MovieList.css';

export default class MovieList extends Component {
  render() {
    const { title, movies, updateMyList } = this.props;
    return movies.length > 0 ? (
      <div className='MovieList'>
        <h1 className='Title'>{title}</h1>
        <ul className='Movies'>
          {movies.map((movie) => (
            <Movie
              key={movie.movieId}
              movie={movie}
              updateMyList={updateMyList}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className='MovieList'>
        <h1 className='Title'>
          No movies to show. Please search for a title of your interest!
        </h1>
      </div>
    );
  }
}
