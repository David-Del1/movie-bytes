import React, { Component } from 'react';
import { isInMyList, changeMyList } from '../utils/movies-api.js';
import { Link } from 'react-router-dom';
import './Movie.css';

export default class Movie extends Component {
  state = {
    isInMyList: !!this.props.updateMyList,
  };

  async componentDidMount() {
    if (!this.state.isInMyList) {
      const { movie } = this.props;
      const token = window.localStorage.getItem('TOKEN');
      this.setState({
        isInMyList: token ? await isInMyList(movie.movieId) : false,
      });
    }
  }

  handleClick = async (e) => {
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
      movie.myList = isInMyList;
      const response = await changeMyList(movie);
      if (response.status !== 200) {
        throw new Error(response.body);
      }
      if (updateMyList) {
        updateMyList(response.body);
      } else {
        this.setState({ isInMyList: !isInMyList });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { movie } = this.props;
    const { isInMyList } = this.state;
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
            onClick={this.handleClick}
            className={isInMyList ? "remove-btn" : "my-list-btn"}>
            {isInMyList ? 'Remove' : 'Add to Watch List'}
          </button>
        </Link>
        
      </li>
    );
  }
}
