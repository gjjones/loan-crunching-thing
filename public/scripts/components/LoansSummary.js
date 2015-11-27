/*eslint-disable no-unused-vars*/
import React, { Component, } from 'react';
/*eslint-enable no-unused-vars*/

class LoanInfo extends Component {
  render () {
    let totalAmountAsCurrency = '$' + this.props.totalAmount.toFixed(2),
      monthsUntilPayoff = Math.ceil(this.props.monthsToPaidOff);

    return (
      <div style={{clear: 'both',}}>
        <h2>I am loan summary!</h2>
        <div>{monthsUntilPayoff} months left till paid off</div>
        <div>You will have paid {totalAmountAsCurrency}</div>
      </div>
    );
  }
}

export default LoanInfo;
