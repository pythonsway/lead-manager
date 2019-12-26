import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addLead } from '../../actions/leads';

export class Form extends Component {
  state = {
    group: 'Work',
    name: '',
    email: '',
    message: '',
  };
  //  ES6 version outside component:
  // 'Leads.propTypes = {' 
  static propTypes = {
    addLead: PropTypes.func.isRequired
  };

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = e => {
    e.preventDefault();
    // const { name, email, message } = this.state;
    // const lead = { name, email, message };
    this.props.addLead(this.state);
    this.setState({
      group: 'Work',
      name: '',
      email: '',
      message: '',
    });
  }

  render() {
    const { group, name, email, message } = this.state;
    return (
      <div className="card bg-light card-body mt-4 mb-4">
        <h2>Add Lead</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="groupSelect">Group</label>
            <select
              className="form-control"
              name="group"
              id="groupSelect"
              onChange={this.handleChange}
              value={group}
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.handleChange}
              value={message}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addLead,
};

export default connect(null, mapDispatchToProps)(Form);