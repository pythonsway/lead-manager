import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authMenu = (
      <>
        <span className="navbar-text mr-3">
          {user ? `Hello ${user.username}` : ""}
        </span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              onClick={this.props.logout}
              className="btn btn-warning btn-sm"
            >
              Logout
          </button>
          </li>
        </ul>
      </>
    );

    const guestMenu = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/register" className="nav-link" activeClassName="active">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" activeClassName="active">
            Login
          </NavLink>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink className="navbar-brand" exact={true} to="/">
              Lead Manager
            </NavLink>
          </div>
          {isAuthenticated ? authMenu : guestMenu}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
