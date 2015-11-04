import React, { Component } from 'react';

class LoanItem extends Component {
  render () {
    function caculatedOrNotMarkup(id, label, calculated, value, changeHandler) {
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
      <div style={{float: 'right', width: '50%'}}>
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
                                    loan.id,
                                    'loan monthly payment:',
                                    !loan.calculatedTerm,
                                    loan.monthlyPayment,
                                    this._onUpdateFixedValue.bind(this)
                                    )}
        {caculatedOrNotMarkup.call(this,
                                    loan.id,
                                    'loan term:',
                                    loan.calculatedTerm,
                                    loan.term,
                                    this._onUpdateFixedValue.bind(this)
                                    )}
      </div>
    );
  }

  _onUpdateFixedValue (event) {
    this.props.onUpdateFixedValue(this.props.loan.id, event);
  }
}

export default LoanItem;