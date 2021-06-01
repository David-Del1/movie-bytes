import React, { Component } from 'react';
import { getMyVote, voteHandler } from '../utils/movies-api.js';
import './Vote.css';

export default class Vote extends Component {
  state = {
    isUpVoted: false,
    isDownVoted: false,
  };

  async componentDidMount() {
    const { movie } = this.props;
    const token = window.localStorage.getItem('TOKEN');
    const { isUpVoted, isDownVoted } = token
      ? await getMyVote(movie.movieId)
      : { isUpVoted: false, isDownVoted: false };
    this.setState({ isUpVoted, isDownVoted });
  }

  handleVote = async (e, clicked) => {
    e.preventDefault();
    try {
      const { movie, updateVoteCounts } = this.props;
      const { isUpVoted, isDownVoted } = this.state;
      const values = await voteHandler(movie, isUpVoted, isDownVoted, clicked);
      if (values.setState)
        this.setState({
          isUpVoted: values.isUpVoted,
          isDownVoted: values.isDownVoted,
        });
      if (updateVoteCounts) updateVoteCounts();
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { voteCounts } = this.props;
    const { isUpVoted, isDownVoted } = this.state;
    return (
      <div className='btn-container'>
        <button
          onClick={(e) => this.handleVote(e, 'upVote')}
          className='vote-btn up'
        >
          {isUpVoted ? '⬆️' : '⬆'}
        </button>
        {voteCounts ? <p>{voteCounts.upVotes}</p> : ''}
        <button
          onClick={(e) => this.handleVote(e, 'downVote')}
          className='vote-btn down'
        >
          {isDownVoted ? '⬇️' : '⬇'}
        </button>
        {voteCounts ? <p>{voteCounts.downVotes}</p> : ''}
      </div>
    );
  }
}
