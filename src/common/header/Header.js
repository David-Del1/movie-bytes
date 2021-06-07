import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

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
      <div className="Header">
        
        <Link to="/">
          <h1 className="logo">Movi-Bytes</h1>
        </Link>

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={search} placeholder="Search for Movie"/>
        </form>
       
        <Link to='/my-list'>My Watch List</Link>

        <img
          className="nav_avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Avatar"
          onClick={this.handleClick}
        />
        
      </div>
    );
  }
}
