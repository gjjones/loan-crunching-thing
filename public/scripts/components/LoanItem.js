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
              type='number'
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
        <div>loan principal: {loan.get('principal')}</div>
        <div>loan interest rate: {loan.get('interestRate')}</div>
        <label>
          <input
            type='radio'
            name={loan.get('id')}
            checked={!loan.get('calculatedTerm')}
            onChange={
              this.props.onToggleCalculatedField.bind(undefined, loan.get('id'))
            }
          /> monthly payment
        </label>
        <label>
          <input
            type='radio'
            name={loan.get('id')}
            checked={loan.get('calculatedTerm')}
            onChange={
              this.props.onToggleCalculatedField.bind(undefined, loan.get('id'))
            }
          /> term
        </label>
        {caculatedOrNotMarkup.call(this,
                                    'loan monthly payment:',
                                    !loan.get('calculatedTerm'),
                                    loan.get('monthlyPayment'),
                                    this._onUpdateMonthlyPayment.bind(this)
                                    )}
        {caculatedOrNotMarkup.call(this,
                                    'loan term:',
                                    loan.get('calculatedTerm'),
                                    loan.get('term'),
                                    this._onUpdateTerm.bind(this)
                                    )}
      </div>
    );
  }

  _onUpdateMonthlyPayment (event) {
    this.props.onUpdateMonthlyPayment(this.props.loan.get('id'), event);
  }

  _onUpdateTerm (event) {
    this.props.onUpdateTerm(this.props.loan.get('id'), event);
  }
}

export default LoanItem;
