export const ADD_LOAN = 'ADD_LOAN';
export const REMOVE_ALL = 'REMOVE_ALL';
export const TOGGLE_CALCULATED_FIELD = 'TOGGLE_CALCULATED_FIELD';
export const UPDATE_PRINCIPAL = 'UPDATE_PRINCIPAL';
export const UPDATE_INTEREST_RATE = 'UPDATE_INTEREST_RATE';
export const UPDATE_MONTHLY_PAYMENT = 'UPDATE_MONTHLY_PAYMENT';
export const UPDATE_TERM = 'UPDATE_TERM';

var naiveId = 0;

export function addLoan() {
  return {
    type: ADD_LOAN,
    id: naiveId++
  };
}

export function removeAll() {
  return {
    type: REMOVE_ALL
  };
}

export function toggleCalculatedField(loanId) {
  return {
    type: TOGGLE_CALCULATED_FIELD,
    loanId
  };
}

export function updatePrincipal(loanId, value) {
  return {
    type: UPDATE_PRINCIPAL,
    loanId,
    value
  };
}

export function updateInterestRate(loanId, value) {
  return {
    type: UPDATE_INTEREST_RATE,
    loanId,
    value
  };
}

export function updateMonthlyPayment(loanId, value) {
  return {
    type: UPDATE_MONTHLY_PAYMENT,
    loanId,
    value
  };
}

export function updateTerm(loanId, value) {
  return {
    type: UPDATE_TERM,
    loanId,
    value
  };
}
