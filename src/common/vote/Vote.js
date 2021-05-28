import React, { Component } from 'react';
import { isMyFavorite, voteHandler } from '../utils/movies-api.js';
import './Vote.css';

export default class Vote extends Component {
  state = {
    isUpVoted: false,
    isDownVoted: false,
  };

  async componentDidMount() {
    const token = window.localStorage.getItem('TOKEN');
    const favorite = token ? await isMyFavorite(movie.movieId) : null;
    let isUpVoted = false,
      isDownVoted = false;
    if (favorite !== null) {
      favorite ? (isUpVoted = true) : (isDownVoted = true);
    }
    this.setState({ isUpVoted, isDownVoted });
  }

  handleVote = async (e, clicked) => {
    e.preventDefault();
    const { movie } = this.props;
    try {
      const { setState, upVoted, downVoted } = voteHandler(
        movie,
        isUpVoted,
        isDownVoted,
        clicked
      );
      if (setState)
        this.setState({ isUpVoted: upVoted, isDownVoted: downVoted });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <div className='btn-container'>
        <button onClick={this.handleVote('upVote')} className='vote-btn up'>
          {isUpVoted ? '⬆️' : '⬆'}
        </button>
        <button onClick={this.handleVote('downVote')} className='vote-btn down'>
          {isDownVoted ? '⬇️' : '⬇'}
        </button>
      </div>
    );
  }
}
