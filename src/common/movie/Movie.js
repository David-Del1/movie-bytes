import React, { Component } from 'react';
import {
  getIsInMyList,
  changeMyList,
  isMyFavorite,
  changeFavorite,
  addMovie,
  isNewMovie,
} from '../utils/movies-api.js';
import { Link } from 'react-router-dom';
import './Movie.css';

export default class Movie extends Component {
  state = {
    isChildOfMyList: !!this.props.updateMyList,
    isInMyList: false,
    isUpVoted: false,
    isDownVoted: false,
  };

  async componentDidMount() {
    let { isChildOfMyList, isInMyList, isUpVoted, isDownVoted } = this.state;
    const token = window.localStorage.getItem('TOKEN');
    const { movie } = this.props;
    if (isChildOfMyList) {
      isInMyList = true;
    } else {
      isInMyList = token ? await getIsInMyList(movie.movieId) : false;
    }
    const favorite = token ? await isMyFavorite(movie.movieId) : null;
    if (favorite !== null) {
      favorite ? (isUpVoted = true) : (isDownVoted = true);
    }
    this.setState({ isInMyList, isUpVoted, isDownVoted });
  }

  handleMyList = async (e) => {
    e.preventDefault();
    const { isInMyList, isChildOfMyList } = this.state;
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
      const { movie } = this.props;
      movie.myList = !isInMyList;
      const response = (await isNewMovie(movie.movieId))
        ? await addMovie(movie)
        : await changeMyList(movie);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      if (isChildOfMyList) {
        const { updateMyList } = this.props;
        updateMyList(response.body);
      } else {
        this.setState({ isInMyList: !isInMyList });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  async handleVote(movie) {
    try {
      const response = (await isNewMovie(movie.movieId))
        ? await addMovie(movie)
        : await changeFavorite(movie);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  handleUpVote = async (e) => {
    e.preventDefault();
    if (!window.localStorage.getItem('TOKEN')) {
      window.alert('You must be logged in to upvote this movie');
      return;
    }
    let { isUpVoted, isDownVoted } = this.state;
    try {
      const { movie } = this.props;
      if (isUpVoted) {
        isUpVoted = false;
        movie.favorite = null;
      } else {
        movie.favorite = true;
        isUpVoted = true;
        isDownVoted = false;
      }
      if (this.handleVote(movie)) this.setState({ isUpVoted, isDownVoted });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleDownVote = async (e) => {
    e.preventDefault();
    if (!window.localStorage.getItem('TOKEN')) {
      window.alert('You must be logged in to downvote this movie');
      return;
    }
    let { isUpVoted, isDownVoted } = this.state;
    try {
      const { movie } = this.props;
      if (isDownVoted) {
        isDownVoted = false;
        movie.favorite = null;
      } else {
        movie.favorite = false;
        isUpVoted = false;
        isDownVoted = true;
      }
      if (this.handleVote(movie)) this.setState({ isUpVoted, isDownVoted });
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
