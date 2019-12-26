import React, { Component } from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import PrivateRoute from './common/PrivateRoute';
import Register from './accounts/Register';
import Login from './accounts/Login';
import PasswordReset from './accounts/PasswordReset';
import Header from './layout/Header';
import Alerts from './layout/Alerts';
import NoMatch from './layout/NoMatch';
import Dashboard from './leads/Dashboard';
import store from '../store';
import { loadUser } from '../actions/auth';

// Alert Options
const alertOptions = {
  timeout: 4000,
  position: 'top right',
};

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <>
              <Alerts />
              <Header />
              <div className="container">
                <div className="row">
                  <div className="col mx-auto">
                    <h1 className="mt-4">Easy store your business contacts</h1>
                    <p>Just type in name, e-mail, message!</p>
                  </div>
                </div>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/password_reset" component={PasswordReset} />
                  <Route component={NoMatch} />
                </Switch>
                <div className="text-center mt-5">
                  <p> by <a href="https://pythonsway.it" target="_blank" rel="noopener noreferrer">Python&#39;s way</a></p>
                </div>
              </div>
            </>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

