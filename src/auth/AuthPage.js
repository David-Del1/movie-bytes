import React, { Component } from 'react';
import { signUp, signIn } from '../utils/movies-api';

export default class AuthPage extends Component {
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: '',
    error: ''
  }

  handleSubmit = async e => {
    const { isSignUp } = this.state;
    const { onUser, history } = this.props;

    e.preventDefault();

    this.setState({ error: '' });

    try {
      const action = isSignUp ? signUp : signIn;
      const user = await action(this.state);
      console.log(user);
      onUser(user);

      history.push('/movies'); //wrong route?
    }
    catch (err) {
      this.setState({ error: err.error })
    }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value })
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value })
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value })
  }

  handleSwitch = () => {
    this.setState({ isSignup: !this.state.isSignUp })
  }

  // handleSwitch = e => { e.preventDefault(); this.setState({ isSignUp: !this.state.isSignUp }); } possibly use if get weird form bahavior

  render() {
    const { isSignUp, name, email, password, error } = this.state;
    return (
      <form className="AuthPage" onSubmit={this.handleSubmit}>
        {isSignUp &&
          <div>
            <label>
              <span>Name</span>
              <input name="name" value={name} required={true} onChange={this.handleNameChange} />
            </label>
          </div>}

        <div>
          <label>
            <span>Email</span>
            <input name="email" value={email} required={true} onChange={this.handleEmailChange} />
          </label>
        </div>

        <div>
          <label>
            <span>Password</span>
            <input name="password" type="password" value={password} required={true} onChange={this.handlePasswordChange} />
          </label>
        </div>

        <div>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </div>

        <div>
          <button type="button" className="switch" onClick={this.handleSwitch}>
            {isSignUp
              ? 'Have an account?'
              : 'Need to create an acount?'}
          </button>
        </div>
      </form>
    )
  }
}
