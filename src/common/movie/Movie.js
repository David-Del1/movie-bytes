import React, { Component } from 'react';
import { isMyFavorite } from '../utils/movies-api.js';
import { Link } from 'react-router-dom';
import './Movie.css';
import Favorites from '../../favorites/Favorites.js';

export default class Movie extends Component {
  state = {
    isFavorite: false,
  };

  async componentDidMount() {
    const token = window.localStorage.getItem('TOKEN');
    this.setState({
      isFavorite: (token ? await isMyFavorite(this.props.movie.movieId) : false)
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('TOKEN');
    if (typeof token === undefined) {
      window.alert('You Must Be Logged In To Add Movies To Favorites');
      return;
    } else {
      if (
        this.state.isFavorite &&
        !window.confirm(
          'Are you sure you wish to remove this from your favorites?'
        )
      ) {
        return;
      }
      try {
        const { movie, onFavorited } = this.props;
        const isFavorite = !this.state.isFavorite;
        onFavorited(movie, isFavorite);
        this.setState({ isFavorite });
      } catch (err) {
        console.log(err.message);
      }
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
