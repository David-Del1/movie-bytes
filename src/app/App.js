import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

import Home from '../home/Home';
import Auth from '../auth/Auth';
import Movies from '../movies/Movies';
import MyList from '../my-list/MyList';
import MovieDetail from '../movie-detail/MovieDetail';
import {
  searchMovies,
  getMyFavorites,
  favoritesHandler,
} from '../common/utils/movies-api.js';

export default class App extends Component {
  state = {
    searchedMovies: [],
    favorites: [],
  };

  handleUser = (user) => {
    window.localStorage.setItem('TOKEN', user.token);
  };

  handleSearch = async (search) => {
    try {
      this.setState({ searchedMovies: await searchMovies(search) });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleFavorite = async (movie, isFavorite) => {
    const { favorites } = this.state;
    this.setState({
      favorites: await favoritesHandler(movie, isFavorite, favorites),
    });
  };

  async componentDidMount() {
    const token = window.localStorage.getItem('TOKEN');
    this.setState({ favorites: token ? await getMyFavorites() : [] });
  }

  render() {
    const { searchedMovies, favorites } = this.state;
    const token = window.localStorage.getItem('TOKEN');
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route
              path='/'
              exact={true}
              render={(routerProps) => (
                <Home
                  {...routerProps}
                  onUser={this.handleUser}
                  onSearch={this.handleSearch}
                  onFavorited={this.handleFavorite}
                />
              )}
            />

            <Route
              path='/auth'
              exact={true}
              render={(routerProps) => (
                <Auth {...routerProps} onUser={this.handleUser} />
              )}
            />

            <Route
              path='/search'
              exact={true}
              render={(routerProps) => (
                <Movies
                  {...routerProps}
                  movies={searchedMovies}
                  onUser={this.handleUser}
                  onSearch={this.handleSearch}
                  onFavorited={this.handleFavorite}
                />
              )}
            />

            <Route
              path='/favorites'
              exact={true}
              render={(routerProps) =>
                token ? (
                  <Movies
                    {...routerProps}
                    movies={favorites}
                    onUser={this.handleUser}
                    onSearch={this.handleSearch}
                    onFavorited={this.handleFavorite}
                  />
                ) : (
                  <Redirect to='/' />
                )
              }
            />

            <Route
              path='/my-list'
              exact={true}
              render={(routerProps) =>
                token ? (
                  <MyList
                    {...routerProps}
                    movies={movies}
                    onUser={this.handleUser}
                    onSearch={this.handleSearch}
                  />
                ) : (
                  <Redirect to='/' />
                )
              }
            />

            <Route
              path='/movies/:id'
              render={(routerProps) => (
                <MovieDetail
                  {...routerProps}
                  onUser={this.handleUser}
                  onSearch={this.handleSearch}
                />
              )}
            />

            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    );
  }
}
