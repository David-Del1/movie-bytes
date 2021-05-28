import React, { Component } from 'react';
import { signUp, signIn } from '../common/utils/movies-api';
import './Auth.css';

export default class Auth extends Component {
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: '',
    error: '',
  };

  handleSubmit = async (e) => {
    const { isSignUp } = this.state;
    const { onUser, history } = this.props;

    e.preventDefault();

    this.setState({ error: '' });

    try {
      const action = isSignUp ? signUp : signIn;
      const user = await action(this.state);
      onUser(user);

      history.push('/movies'); //wrong route?
    } catch (err) {
      this.setState({ error: err.error });
    }
  };

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSwitch = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  render() {
    const { isSignUp, name, email, password, error } = this.state;
    return (
      <div
        className="AuthContainer"
        style={{ backgroundImage: "url(../assets/auth-bg.jpeg)" }}
      >
        <h1 className="auth-logo">Movi-Bytes</h1>
        <form className='Auth' onSubmit={this.handleSubmit}>
          {isSignUp && (
            <div>
              <label>
                {/* <span>Name</span> */}
                <input
                  name='name'
                  value={name}
                  required={true}
                  onChange={this.handleNameChange}
                  placeholder="Name"
                />
              </label>
            </div>
          )}

          <div>
            <label>
              {/* <span>Email</span> */}
              <input
                name='email'
                value={email}
                required={true}
                onChange={this.handleEmailChange}
                placeholder="Email"
              />
            </label>
          </div>

          <div>
            <label>
              {/* <span>Password</span> */}
              <input
                name='password'
                type='password'
                value={password}
                required={true}
                onChange={this.handlePasswordChange}
                placeholder="Password"
              />
            </label>
          </div>

          <div>
            <button type='submit'>{isSignUp ? 'Sign Up' : 'Log In'}</button>
          </div>

          <div>
            <button type='button' className='switch' onClick={this.handleSwitch}>
              {isSignUp ? 'Have an account?' : 'Need to create an account?'}
            </button>
          </div>

        </form>
        {/* {error && window.alert('Oh no! Wrong Username or Password.')} */}
      </div>


    );
  }
}
