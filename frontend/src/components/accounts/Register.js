import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      this.props.register(username, password, email);
    }
  };

  handleChange = e => {
    this.setState({
      // [] - use that value as the key
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card bg-light card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.handleChange}
                value={username}
                autoComplete="userame"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleChange}
                value={email}
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
                value={password}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.handleChange}
                value={password2}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={!this.state.username || !this.state.email || !this.state.password || !this.state.password2}>
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  register,
  createMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
