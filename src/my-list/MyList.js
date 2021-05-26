import React, { Component } from 'react';
import './MyList.css';

export default class MyList extends Component {
  render() {
    return (
      <div className='MyList'>
        <Header />
        <Banner fetchUrl='/api/movies/popular' />
        <MovieList fetchUrl='/api/movies/popular' />
        <Footer />
      </div>
    );
  }
}
