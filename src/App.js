import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import AuthPage from './auth/AuthPage';
import MoviesList from './movies-list/MoviesList';
import { hot } from 'react-hot-loader';
import URL from './utils/movies-api.js';

class App extends Component {
  state = {
    token: window.localStorage.getItem('TOKEN'),
  };

  handleUser = (user) => {
    window.localStorage.setItem('TOKEN', user.token);
    this.setState({ token: user.token });
  };

  render() {
    const { token } = this.state;

    return (
      <div className='App'>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route
                path='/'
                exact={true}
                render={(routerProps) => (
                  <AuthPage {...routerProps} onUser={this.handleUser} />
                )}
              />

              <Route
                path='/auth'
                exact={true}
                render={(routerProps) => (
                  <AuthPage {...routerProps} onUser={this.handleUser} />
                )}
              />

              <Route
                path='/movies' //check this route. not in backend
                render={(routerProps) =>
                  token ? (
                    <MoviesList {...routerProps} />
                  ) : (
                    <Redirect to='/auth' />
                  )
                }
              />

              <Redirect to='/' />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default hot(module)(App);
