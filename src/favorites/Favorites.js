import React, { Component } from 'react';
import './Favorites.css';

export default class Favorites extends Component {
  render() {
    return (
      <div className='Favorites'>
        <Header onUser={onUser} onSearch={onSearch} />
        <Banner fetchUrl='/api/movies/popular' />
        <MovieList fetchUrl='/api/movies/popular' />
        <Footer />
      </div>
    );
  }
}
