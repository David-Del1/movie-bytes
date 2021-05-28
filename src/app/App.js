import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../home/Home';
import Auth from '../auth/Auth';
import Search from '../search/Search';
import MyList from '../my-list/MyList';
import MovieDetail from '../movie-detail/MovieDetail';
import { searchMovies } from '../common/utils/movies-api.js';
import './App.css';
export default class App extends Component {
  state = {
    searchedMovies: [],
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

  render() {
    const { searchedMovies } = this.state;
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
                  movies={searchedMovies}
                  onUser={this.handleUser}
                  onSearch={this.handleSearch}
                />
              )}
            />

            <Route
              path='/my-list'
              exact={true}
              render={(routerProps) =>
                token ? (
                  <MyList
                    {...routerProps}
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
              exact={true}
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
