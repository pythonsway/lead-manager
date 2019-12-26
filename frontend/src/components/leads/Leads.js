import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLeads, deleteLead } from '../../actions/leads';
import FilterTable from './FilterTable';

class Leads extends Component {
  //  ES6 version outside component:
  // 'Leads.propTypes = {' 
  static propTypes = {
    leads: PropTypes.array.isRequired,
    searchName: PropTypes.string.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    return (
      <>
        <h2>Leads list</h2>
        <FilterTable />
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Group</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th />
              </tr>
            </thead>
            <tbody>              
              {this.props.leads
                // indexOf('') // returns 0
                // .filter(lead => (this.props.searchName ? lead['name'].includes(this.props.searchName) : true))
                .filter(lead => (lead['name'].toLowerCase().indexOf(this.props.searchName.toLowerCase()) > -1))
                .map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.created_at}</td>
                    <td>{lead.group}</td>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.message}</td>
                    <td>
                      <button
                        onClick={this.props.deleteLead.bind(this, lead.id)}
                        className="btn btn-danger btn-sm"
                      >
                        X
                  </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads.leads,
  searchName: state.leads.searchName
});

const mapDispatchToProps = {
  getLeads,
  deleteLead
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);