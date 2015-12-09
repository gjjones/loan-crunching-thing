/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/

const NumberField = ({label, value, onChange}) => (
  <label>
    {label}
    {' '}
    <input
      type='number'
      value={value}
      onChange={onChange}
    />
  </label>
)
const RadioField = ({label, checked, onChange}) => (
  <label>
    <input
      type='radio'
      checked={checked}
      onChange={onChange}
    />
    {' '}
    {label}
  </label>
)

const EditableNumberLabelField = ({label, value, editing, onChange}) => {
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

const LoanItem = ({
  loan,
  onUpdatePrincipal,
  onUpdateInterestRate,
  onToggleCalculatedField,
  onUpdateMonthlyPayment,
  onUpdateTerm
}) => (
  <div style={{float: 'left', width: '50%'}}>
    <h3>I am a loan</h3>
    <NumberField
      label='loan principal:'
      value={loan.get('principal')}
      onChange={onUpdatePrincipal}
    />
    <br/>
    <NumberField
      label='loan interest rate:'
      value={loan.get('interestRate')}
      onChange={onUpdateInterestRate}
    />
    <br/>
    <RadioField
      label='monthly payment'
      checked={!loan.get('calculatedTerm')}
      onChange={onToggleCalculatedField}
    />
    <br/>
    <RadioField
      label='term'
      checked={loan.get('calculatedTerm')}
      onChange={onToggleCalculatedField}
    />
    <br/>
    <EditableNumberLabelField
      label='loan monthly payment:'
      value={loan.get('monthlyPayment')}
      editing={loan.get('calculatedTerm')}
      onChange={onUpdateMonthlyPayment}
    />
    <br/>
    <EditableNumberLabelField
      label='loan term:'
      value={loan.get('term')}
      editing={!loan.get('calculatedTerm')}
      onChange={onUpdateTerm}
    />
  </div>
)

export default LoanItem;
