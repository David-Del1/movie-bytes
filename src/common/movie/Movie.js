import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ToggleMyList from '../toggle-my-list/ToggleMyList.js';
import Vote from '../vote/Vote.js';
import './Movie.css';
export default class Movie extends Component {
  render() {
    const { movie, onUpdate } = this.props;
    return (
      <li className='Movie'>
        <Link to={`/movies/${movie.movieId}`}>
          <img
            key={movie.movieId}
            className='row_poster'
            src={movie.poster}
            alt={movie.name}
          />
          
          <ToggleMyList movie={movie} onUpdate={onUpdate} />

          <Vote movie={movie} />
        </Link>
      </li>
    );
  }
}
