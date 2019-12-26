import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      // msg object has values as an arrays
      if (error.msg.name) return alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) return alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message) return alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.username) return alert.error(error.msg.username.join());
      if (error.msg.non_field_errors) return alert.error(error.msg.non_field_errors.join());
    }

    if (message !== prevProps.message) {
      if (message.deleteLead) return alert.success(message.deleteLead);
      if (message.addLead) return alert.success(message.addLead);
      if (message.passwordNotMatch) return alert.error(message.passwordNotMatch);
      if (message.sendEmail) return alert.success(message.sendEmail);

    }
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));