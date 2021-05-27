import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSearch, history } = this.props;
    onSearch(this.state.search);
    history.push('/search');
  };

  handleClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const token = window.localStorage.getItem('TOKEN');
    if (token === null) {
      history.push('/auth');
    } else {
      window.localStorage.removeItem('TOKEN');
      history.push('/');
    }
  };

  render() {
    const { search } = this.state;
    const { onUser, onSearch } = this.props;
    const token = window.localStorage.getItem('TOKEN');
    return (
      <div>
        <h1>Movi-Bytes</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={search} />
        </form>
        <Link to='/my-list'>My List</Link>
        <button onClick={this.handleClick}>
          {token ? 'Sign Out' : 'Log In'}
        </button>
      </div>
    );
  }
}
