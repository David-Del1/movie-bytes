import React, { Component } from 'react';
import { discoverMovies } from '../common/utils/movies-api.js';
import Header from '../common/header/Header';
import Banner from '../common/banner/Banner';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import './Home.css';

export default class Home extends Component {
  state = {
    popular: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  };

  async componentDidMount() {
    const { fetchUrl } = this.props;
    this.setState({
      popular: await discoverMovies('/api/movies/popular'),
      action: await discoverMovies('/api/movies/genre/28'),
      comedy: await discoverMovies('/api/movies/genre/35'),
      horror: await discoverMovies('/api/movies/genre/27'),
      romance: await discoverMovies('/api/movies/genre/10749'),
      documentaries: await discoverMovies('/api/movies/genre/99'),
    });
  }

  render() {
    const { history, onUser, onSearch } = this.props;
    const { popular, action, comedy, horror, romance, documentaries } =
      this.state;
    return (
      <div className='Movies'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <Banner fetchUrl='/api/movies/popular' />
        <MovieList title='Popular' movies={popular} />
        <MovieList title='Action' movies={action} />
        <MovieList title='Comedy' movies={comedy} />
        <MovieList title='Horror' movies={horror} />
        <MovieList title='Romance' movies={romance} />
        <MovieList title='Documentaries' movies={documentaries} />
        <Footer />
      </div>
    );
  }
}
