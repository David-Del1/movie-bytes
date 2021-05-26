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
      <div className='MovieDetail'>
        <Header onUser={onUser} onSearch={onSearch} />
        <h1>{movie.title}</h1>
        <img src={movie.backdrop} alt={movie.title} />
        <p>{movie.overview}</p>
        <Footer />
      </div>
    );
  }
}
