/*eslint-disable no-unused-vars*/
import React, { Component, } from 'react';
/*eslint-enable no-unused-vars*/

class LoanItem extends Component {
  render () {
    function caculatedOrNotMarkup(label, calculated, value, changeHandler) {
      if (calculated) {
        return <div>{label} {value}</div>;
      }
      else {
        return <div>
          <label>
            {label}
            <input
              type='text'
              value={value}
              onChange={changeHandler}
            />
          </label>
        </div>;
      }
    }

    let loan = this.props.loan;
    return (
      <div style={{float: 'right', width: '50%',}}>
        <h3>I am a loan</h3>
        <div>loan principal: {loan.principal}</div>
        <div>loan interest rate: {loan.interestRate}</div>
        <label>
          <input
            type='radio'
            name={loan.id}
            checked={!loan.calculatedTerm}
            onChange={
              this.props.onToggleCalculatedField.bind(undefined, loan.id)
            }
          /> monthly payment
        </label>
        <label>
          <input
            type='radio'
            name={loan.id}
            checked={loan.calculatedTerm}
            onChange={
              this.props.onToggleCalculatedField.bind(undefined, loan.id)
            }
          /> term
        </label>
        {caculatedOrNotMarkup.call(this,
                                    'loan monthly payment:',
                                    !loan.calculatedTerm,
                                    loan.monthlyPayment,
                                    this._onUpdateMonthlyPayment.bind(this)
                                    )}
        {caculatedOrNotMarkup.call(this,
                                    'loan term:',
                                    loan.calculatedTerm,
                                    loan.term,
                                    this._onUpdateTerm.bind(this)
                                    )}
      </div>
    );
  }

  _onUpdateMonthlyPayment (event) {
    this.props.onUpdateMonthlyPayment(this.props.loan.id, event);
  }

  _onUpdateTerm (event) {
    this.props.onUpdateTerm(this.props.loan.id, event);
  }
}

export default LoanItem;
