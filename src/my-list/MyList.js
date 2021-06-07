import React, { Component } from 'react';
import Header from '../common/header/Header';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import { getMyList } from '../common/utils/movies-api.js';
import './MyList.css';

export default class MyList extends Component {
  state = { myList: [] };

  async componentDidMount() {
    // App.js already prevents this component loading if no token
    this.setState({ myList: await getMyList() });
  }

  handleUpdate = (removed) => {
    const { myList } = this.state;

    this.setState({ 
      myList: myList.filter(movie => movie.movieId !== removed.movieId) 
    });
   
  };

  render() {
    const { history, onUser, onSearch } = this.props;
    const { myList } = this.state;

    return (
      <div className='MyList'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
    
        <div className="container">
          {/* Use onEvent for callback props */}
          <MovieList movies={myList} onUpdate={this.handleUpdate} />
        </div>
        
        <Footer />
      </div>
    );
  }
}
