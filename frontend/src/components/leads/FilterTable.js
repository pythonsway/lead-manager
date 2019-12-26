import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterLeads } from '../../actions/leads';

// pass the action creator and 'filterStr' as props.
// stateless component since we're not keeping the 'fitlerStr' in the component state at all.
export class FilterTable extends Component {
  //  ES6 version outside component:
  // 'Leads.propTypes = {' 
  static propTypes = {
    leads: PropTypes.array.isRequired,
    searchName: PropTypes.string.isRequired,
    filterLeads: PropTypes.func.isRequired
  };

  handleChange = e => {
    this.props.filterLeads(e.target.value);
  }

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text">Search:</span>
        </div>
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          value={this.props.searchName}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.leads.leads,
  searchName: state.leads.searchName
});

const mapDispatchToProps = {
  filterLeads
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTable);
