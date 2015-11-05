export const ADD_LOAN = 'ADD_LOAN';
export const ADD_LOANS = 'ADD_LOANS';
export const TOGGLE_CALCULATED_FIELD = 'TOGGLE_CALCULATED_FIELD';
export const UPDATE_MONTHLY_PAYMENT = 'UPDATE_MONTHLY_PAYMENT';
export const UPDATE_TERM = 'UPDATE_TERM';

export function addLoan(loan) {
  return {
    type: ADD_LOAN,
    loan,
  };
}

export function addLoans(loans) {
  return {
    type: ADD_LOANS,
    loans,
  };
}

export function toggleCalculatedField(loanId) {
  return {
    type: TOGGLE_CALCULATED_FIELD,
    loanId,
  };
}

export function updateMonthlyPayment(loanId, value) {
  return {
    type: UPDATE_MONTHLY_PAYMENT,
    loanId,
    value,
  };
}

export function updateTerm(loanId, value) {
  return {
    type: UPDATE_TERM,
    loanId,
    value,
  };
}
