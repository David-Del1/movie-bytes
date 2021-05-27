import React, { Component } from 'react';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import { fetchMovieDetail } from '../common/utils/movies-api';
import './MovieDetail.css';

export default class MovieDetail extends Component {
  state = {
    movie: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const movie = await fetchMovieDetail(match.params.id);
      this.setState({ movie: movie });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { movie } = this.state;
    const { onUser, onSearch } = this.props;
    return (
      <>
      <Header onUser={onUser} onSearch={onSearch} />
      <div 
        className='MovieDetail'
        style={{backgroundImage: `url(${movie.backdrop})`}}>
        
        <h1>{movie.title}</h1>
        <p className="movie-overview">{movie.overview}</p>

        {/* <button 
            onClick={this.handleClick}
            className="fave-button">
              {isFavorite ? '♥️' : '♡'}
          </button> */}
        
      </div>
      </>
    );
  }
}
