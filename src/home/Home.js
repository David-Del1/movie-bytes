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
    // run these in parallel:
    const [popular, action, comedy, horror, romance, documentaries] = await Promise.all([
      discoverMovies('/api/movies/popular'),
      discoverMovies('/api/movies/genre/28'),
      discoverMovies('/api/movies/genre/35'),
      discoverMovies('/api/movies/genre/27'),
      discoverMovies('/api/movies/genre/10749'),
      discoverMovies('/api/movies/genre/99'),
    ]);

    this.setState({ popular, action, comedy, horror, romance, documentaries });
  }

  render() {
    const { history, onUser, onSearch } = this.props;
    const { popular, action, comedy, horror, romance, documentaries } = this.state;
    
    return (
      <div className='Movies'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <Banner/>
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
