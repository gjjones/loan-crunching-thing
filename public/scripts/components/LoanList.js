import React, { Component } from 'react';
import LoanItem from './LoanItem';
import { connect } from 'react-redux';

import {
  toggleCalculatedField,
  updateFixedValue,
} from '../actions/actions';

class LoanList extends Component {
  render () {
    let loansMarkup = this.props.loans.map(function (loan) {
      return <LoanItem
                key={loan.id}
                loan={loan}
                onToggleCalculatedField={this.toggleCalculatedField.bind(this)}
                onUpdateFixedValue={this.updateFixedValue.bind(this)}
              />;
    }.bind(this));
    return (
      <div>
        <h2>I am loan info!</h2>
        {loansMarkup}
      </div>
    );
  }

  toggleCalculatedField (loanId) {
    this.props.dispatch(toggleCalculatedField(loanId));
  }

  updateFixedValue (loanId, event) {
    this.props.dispatch(updateFixedValue(loanId, event.target.value));
  }
}

function mapStateToProps (state) {
  return {
    loans: state.loans,
  }
}

export default connect(mapStateToProps)(LoanList);
