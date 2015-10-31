import React, { Component } from 'react';

class LoanItem extends Component {
  render () {
    return (
      <div>
        loan principal: {this.props.loan.principal}
      </div>
    );
  }
}

export default LoanItem;
