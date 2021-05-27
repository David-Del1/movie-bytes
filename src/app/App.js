import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

import Movies from '../movies/Movies';
import Auth from '../auth/Auth';
import Search from '../search/Search';
import Favorites from '../favorites/Favorites';
import MyList from '../my-list/MyList';
import MovieDetail from '../movie-detail/MovieDetail';
import { searchMovies } from '../common/utils/movies-api.js';

export default class App extends Component {
  state = {
    token: window.localStorage.getItem('TOKEN')
      ? window.localStorage.getItem('TOKEN')
      : '',
    userId: 0,
    movies: [],
  };

  handleUser = (user) => {
    window.localStorage.setItem('TOKEN', user.token);
    window.localStorage.setItem('USERID', user.id);
    this.setState({ token: user.token, userId: user.id });
  };

  handleSearch = async (search) => {
    try {
      this.setState({ movies: await searchMovies(search) });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { movies, token } = this.state;
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route
              path='/'
              exact={true}
              render={(routerProps) => (
                <Movies
                  {...routerProps}
                  onUser={this.handleUser}
                  onSearch={this.handleSearch}
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
                <Search
                  {...routerProps}
                  movies={movies}
                  onSearch={this.handleSearch}
                />
              )}
            />

            <Route
              path='/favorites'
              exact={true}
              render={(routerProps) =>
                this.state.token ? (
                  <Favorites
                    {...routerProps}
                    movies={movies}
                    onSearch={this.handleSearch}
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
                this.state.token ? (
                  <MyList
                    {...routerProps}
                    movies={movies}
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
