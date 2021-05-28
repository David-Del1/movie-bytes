import React, { Component } from 'react';
import Header from '../common/header/Header';
import {
  fetchMovieDetail,
  fetchMovieTrailerId,
} from '../common/utils/movies-api';
import './MovieDetail.css';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    movieTrailer: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const movie = await fetchMovieDetail(match.params.id);
      const movieTrailer = await fetchMovieTrailerId(match.params.id);
      this.setState({
        movie: movie,
        movieTrailer: movieTrailer,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { movie, movieTrailer } = this.state;
    const { history, onUser, onSearch } = this.props;
    return (
      <>
        <Header onUser={onUser} onSearch={onSearch} history={history} />
        <div
          className='MovieDetail'
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <h1>{movie.title}</h1>
          <iframe
            width='800'
            height='444'
            src={`https://www.youtube.com/embed/${movieTrailer}`}
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
            className='trailer'
          ></iframe>
          <p className='movie-overview'>{movie.overview}</p>
        </div>
      </>
    );
  }
}