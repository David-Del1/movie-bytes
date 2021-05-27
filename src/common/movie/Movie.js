import React, { Component } from 'react';
import {
  isMyFavorite,
  addFavorite,
  deleteFavorite,
} from '../utils/movies-api.js';
import { Link } from 'react-router-dom';
import './Movie.css';

export default class Movie extends Component {
  state = {
    isFavorite: !!this.props.updateFavorites,
  };

  async componentDidMount() {
    if (!this.state.isFavorite) {
      const { movie } = this.props;
      const token = window.localStorage.getItem('TOKEN');
      this.setState({
        isFavorite: token ? await isMyFavorite(movie.movieId) : false,
      });
    }
  }

  handleClick = async (e) => {
    e.preventDefault();
    //debugger;
    const { isFavorite } = this.state;
    if (
      isFavorite &&
      !window.confirm(
        'Are you sure you wish to remove this movie from your favorites?'
      )
    )
      return;
    if (!window.localStorage.getItem('TOKEN')) {
      window.alert('You must be logged in to add this movie to favorites');
      return;
    }
    try {
      const { movie, updateFavorites } = this.props;
      if (!isFavorite) {
        const response = await addFavorite(movie);
        if (response.status !== 200) {
          throw new Error(response.body);
        }
        this.setState({ isFavorite: !isFavorite });
      } else {
        const response = await deleteFavorite(movie.movieId);
        if (response.status !== 200) {
          throw new Error(response.body);
        }
        if (updateFavorites) {
          updateFavorites(response.body);
        } else {
          this.setState({ isFavorite: !isFavorite });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { movie } = this.props;
    const { isFavorite } = this.state;
    return (
      <li className='Movie'>
        <Link to={`/movies/${movie.movieId}`}>
          <img
            key={movie.movieId}
            className='row_poster'
            src={movie.poster}
            alt={movie.name}
          />
          <button onClick={this.handleClick}>{isFavorite ? '♥️' : '♡'}</button>
        </Link>
      </li>
    );
  }
}
