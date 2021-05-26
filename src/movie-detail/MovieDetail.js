import React, { Component } from 'react';
import { fetchMovieDetail } from '../utils/movies-api';
import './MovieDetail.css';

export default class MovieDetail extends Component {
  state = {
    movie: {}
  }

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
    return (
      <div className="MovieDetail">
        <h1>{movie.title}</h1>
        <img src={movie.backdrop} alt={movie.title} />
        <p>{movie.overview}</p>
      </div>
    )
  }
}

