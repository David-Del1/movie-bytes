import React, { Component } from 'react';
import Header from '../common/header/Header';
import MovieList from '../common/movie-list/MovieList';
import Footer from '../common/footer/Footer';
import { getMyList } from '../common/utils/movies-api.js';
import './MyList.css';

export default class MyList extends Component {
  state = { myList: [] };

  async componentDidMount() {
    const token = window.localStorage.getItem('TOKEN');
    this.setState({ myList: token ? await getMyList() : [] });
  }

  handleUpdate = (movie) => {
    const { myList } = this.state;
    // find the movie id to delete
    let index = 0;
    for (let i = 0; i < myList.length; i++) {
      if (myList[i].movieId === movie.movieId) {
        index = i;
        break;
      }
    }
    // delete the movie from favorites array
    myList.splice(index, 1);
    this.setState({ myList });
  };

  render() {
    const { history, onUser, onSearch } = this.props;
    const { myList } = this.state;
    return (
      <div className='MyList'>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <MovieList movies={myList} updateMyList={this.handleUpdate} />
        <Footer />
      </div>
    );
  }
}
