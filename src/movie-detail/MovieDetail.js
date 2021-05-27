import React, { Component } from 'react';
import Header from '../common/header/Header';
import { fetchMovieDetail, fetchMovieTrailerId } from '../common/utils/movies-api';
import './MovieDetail.css';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    movieTrailer: ''
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const movie = await fetchMovieDetail(match.params.id);
      const movieTrailer = await fetchMovieTrailerId(match.params.id);
      this.setState({
        movie: movie,
        movieTrailer: movieTrailer
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { movie, movieTrailer } = this.state;
    console.log(movieTrailer);
    const { onUser, onSearch } = this.props;
    return (
      <>
        <Header onUser={onUser} onSearch={onSearch} />
        <div
          className='MovieDetail'
          style={{ backgroundImage: `url(${movie.backdrop})` }}>

          <h1>{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movieTrailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        </div>
      </>
    );
  }
}
