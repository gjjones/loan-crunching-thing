/*eslint-disable no-unused-vars*/
import React, { Component, } from 'react';
/*eslint-enable no-unused-vars*/

const NumberField = ({label, value, onChange,}) => {
  return (
    <label>
      {label}
      {' '}
      <input
        type='number'
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
const RadioField = ({label, checked, onChange,}) => {
  return (
    <label>
      <input
        type='radio'
        checked={checked}
        onChange={onChange}
      />
      {' '}
      {label}
    </label>
  );
};

const EditableNumberLabelField = ({label, value, editing, onChange,}) => {
  if (!editing) {
    return <span>{label} {value}</span>;
  }
  return (
    <label>
      {label}
      {' '}
      <input
        type='number'
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

class LoanItem extends Component {
  render () {
    let {loan,} = this.props;
    return (
      <div style={{float: 'left', width: '50%',}}>
        <h3>I am a loan</h3>
        <NumberField
          label='loan principal:'
          value={loan.get('principal')}
          onChange={this.handlePrincipalChanged.bind(this)}
        />
        <br/>
        <NumberField
          label='loan interest rate:'
          value={loan.get('interestRate')}
          onChange={this.handleInterestRateChanged.bind(this)}
        />
        <br/>
        <RadioField
          label='monthly payment'
          checked={!loan.get('calculatedTerm')}
          onChange={
            this.props.onToggleCalculatedField.bind(undefined, loan.get('id'))
          }
        />
        <br/>
        <RadioField
          label='term'
          checked={loan.get('calculatedTerm')}
          onChange={
            this.props.onToggleCalculatedField.bind(undefined, loan.get('id'))
          }
        />
        <br/>
        <EditableNumberLabelField
          label='loan monthly payment:'
          value={loan.get('monthlyPayment')}
          editing={loan.get('calculatedTerm')}
          onChange={this.handleMonthlyPaymentChanged.bind(this)}
        />
        <br/>
        <EditableNumberLabelField
          label='loan term:'
          value={loan.get('term')}
          editing={!loan.get('calculatedTerm')}
          onChange={this.handleTermChanged.bind(this)}
        />
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
