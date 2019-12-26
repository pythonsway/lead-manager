import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { passReset } from '../../actions/auth';

export class PasswordReset extends Component {
  state = {
    email: '',
  };

  static propTypes = {
    passReset: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    emailSent: PropTypes.bool
  };

  handleSubmit = e => {
    e.preventDefault();
        this.props.passReset(this.state.email);
  };

  handleChange = e => {
    this.setState({
      // [] - use that value as the key
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.isAuthenticated) return <Redirect to='/' />;
    if (this.props.emailSent) return <Redirect to='/login' />;
    const { email } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card bg-light card-body mt-5">
          <h2 className="text-center">Reset password</h2>
          <p>Enter your email address to receive new password.</p>
          <form onSubmit={this.handleSubmit}>
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
              <button type="submit" className="btn btn-primary" disabled={!this.state.email || this.props.emailSent}>
                Send
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  emailSent: state.auth.emailSent
});

const mapDispatchToProps = {
  passReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
