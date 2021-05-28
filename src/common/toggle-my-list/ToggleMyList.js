import React, { Component } from 'react';
import { getIsInMyList, toggleMyListHandler } from '../utils/movies-api.js';
import './ToggleMyList.css';

export default class ToggleMyList extends Component {
  state = {
    isInMyList: false,
  };

  async componentDidMount() {
    const token = window.localStorage.getItem('TOKEN');
    const { movie } = this.props;
    const isInMyList = token ? await getIsInMyList(movie.movieId) : false;
    this.setState({ isInMyList });
  }

  handleMyList = async (e) => {
    e.preventDefault();
    try {
      const { movie } = this.props;
      const { isInMyList } = this.state;
      const handledMovie = toggleMyListHandler(movie, isInMyList);
      if (handledMovie !== null) {
        const { updateMyList } = this.props;
        if (updateMyList !== null) updateMyList(handledMovie);
        this.setState({ isInMyList: !isInMyList });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { isInMyList } = this.state;
    return (
      <button
        onClick={this.handleMyList}
        className={isInMyList ? 'remove-btn' : 'my-list-btn'}
      >
        {isInMyList ? 'Remove' : 'Add to Watch List'}
      </button>
    );
  }
}
