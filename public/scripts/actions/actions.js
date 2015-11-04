export const ADD_LOAN = "ADD_LOAN";
export const ADD_LOANS = "ADD_LOANS";
export const TOGGLE_CALCULATED_FIELD = "TOGGLE_CALCULATED_FIELD";
export const UPDATE_FIXED_VALUE = "UPDATE_FIXED_VALUE";

export function addLoan(loan) {
  return {
    type: ADD_LOAN,
    loan
  }
}

export function addLoans(loans) {
  return {
    type: ADD_LOANS,
    loans
  }
}

export function toggleCalculatedField(loanId) {
  return {
    type: TOGGLE_CALCULATED_FIELD,
    loanId
  }
}

export function updateFixedValue(loanId, value) {
  return {
    type: UPDATE_FIXED_VALUE,
    loanId,
    value
  }
}
