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
      <div style={{float: 'left', width: '50%',}}>
        <h3>I am a loan</h3>
        <div>loan principal:
          <input
            type="number"
            value={loan.get('principal')}
            onChange={this.handlePrincipalChanged.bind(this)}
          />
        </div>
        <div>loan interest rate:
          <input
            type="number"
            value={loan.get('interestRate')}
            onChange={this.handleInterestRateChanged.bind(this)}
          />
        </div>
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
                                    this.handleMonthlyPaymentChanged.bind(this)
                                    )}
        {caculatedOrNotMarkup.call(this,
                                    'loan term:',
                                    loan.get('calculatedTerm'),
                                    loan.get('term'),
                                    this.handleTermChanged.bind(this)
                                    )}
      </div>
    );
  }

  handlePrincipalChanged (event) {
    this.props.onUpdatePrincipal(this.props.loan.get('id'), event);
  }

  handleInterestRateChanged (event) {
    this.props.onUpdateInterestRate(this.props.loan.get('id'), event);
  }

  handleMonthlyPaymentChanged (event) {
    this.props.onUpdateMonthlyPayment(this.props.loan.get('id'), event);
  }

  handleTermChanged (event) {
    this.props.onUpdateTerm(this.props.loan.get('id'), event);
  }
}

export default LoanItem;
