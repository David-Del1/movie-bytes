import React, { Component } from 'react';
import {
  isInMyList,
  changeMyList,
  isMyFavorite,
  changeFavorite,
  addMovie,
} from '../utils/movies-api.js';
import { Link } from 'react-router-dom';
import './Movie.css';

export default class Movie extends Component {
  state = {
    isChildOfMyList: !!this.props.updateMyList,
    isInMyList: false,
    isUpVoted: null,
    isDownVoted: null,
  };

  async componentDidMount() {
    let { isChildOfMyList, isInMyList, isUpVoted, isDownVoted } = this.state;
    const token = window.localStorage.getItem('TOKEN');
    if (!isChildOfMyList) {
      const { movie } = this.props;
      isInMyList = token ? await isInMyList(movie.movieId) : false;
    }
    const favorite = await isMyFavorite(movie.movieId);
    if (favorite !== null) {
      favorite ? (isUpVoted = true) : (isDownVoted = true);
    }
    this.setState({ isInMyList, isUpVoted, isDownVoted });
  }

  handleMyList = async (e) => {
    e.preventDefault();
    const { isInMyList } = this.state;
    if (
      isInMyList &&
      !window.confirm(
        'Are you sure you wish to remove this movie from your list?'
      )
    )
      return;
    if (!window.localStorage.getItem('TOKEN')) {
      window.alert('You must be logged in to add this movie to your list');
      return;
    }
    try {
      const { movie, updateMyList } = this.props;
      // if it is a new movie
      if (newMovie) addMovie;
      else changeMyList;
      movie.myList = isInMyList;
      const response = await changeMyList(movie);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      if (isChildOfMyList) {
        updateMyList(response.body);
      } else {
        this.setState({ isInMyList: !isInMyList });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  handleUpVote = async (e) => {
    e.preventDefault();
    const { isUpvoted } = this.state;
    try {
      let { movie } = this.props;
      movie.favorite = isUpvoted;
      const response = await changeFavorite(movie);
      if (response.status !== 200) {
        throw new Error(response.body);
      } else {
        movie = response.body;
        const favorite = movie.favorite;
        if (favorite !== null) {
          favorite
            ? this.setState({ isUpvoted: true })
            : this.setState({ isDownvoted: true });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { movie } = this.props;
    const { isInMyList, isUpVoted, isDownVoted } = this.state;
    return (
      <li className='Movie'>
        <Link to={`/movies/${movie.movieId}`}>
          <img
            key={movie.movieId}
            className='row_poster'
            src={movie.poster}
            alt={movie.name}
          />
          <button
            onClick={this.handleMyList}
            className={isInMyList ? 'remove-btn' : 'my-list-btn'}
          >
            {isInMyList ? 'Remove' : 'Add to Watch List'}
          </button>
          <button onClick={this.handleUpVote}>{isUpVoted ? '⬆️' : '⬆'}</button>
          <button onClick={this.handleDownVote}>
            {isDownVoted ? '⬇️' : '⬇'}
          </button>
        </Link>
      </li>
    );
  }
}
