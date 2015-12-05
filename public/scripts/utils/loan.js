import Immutable from 'immutable';
import {
  calculateMonthlyPayment,
  calculateTerm,
} from './formulas';

function createLoan(id) {
  return Immutable.Map({
    id: id,
    principal: 0,
    interestRate: 0,
    monthlyPayment: 0,
    term: 0,
    calculatedTerm: true,
  });
}

function updatePrincipal(principal, loan) {
  let interestRate = loan.get('interestRate'),
    monthlyPayment,
    term;

  if (loan.get('calculatedTerm')) {
    monthlyPayment = loan.get('monthlyPayment');
    term = calculateTerm(principal, interestRate, monthlyPayment);
    loan = loan.merge({principal, term,});
  }
  else {
    term = loan.get('term');
    monthlyPayment = calculateMonthlyPayment(principal, interestRate, term);
    loan = loan.merge({principal, monthlyPayment,});
  }

  return loan;
}

function updateInterestRate(interestRate, loan) {
  let principal = loan.get('principal'),
    monthlyPayment,
    term;

  if (loan.get('calculatedTerm')) {
    monthlyPayment = loan.get('monthlyPayment');
    term = calculateTerm(principal, interestRate, monthlyPayment);
    loan = loan.merge({interestRate, term,});
  }
  else {
    term = loan.get('term');
    monthlyPayment = calculateMonthlyPayment(principal, interestRate, term);
    loan = loan.merge({interestRate, monthlyPayment,});
  }

  return loan;
}

function updateMonthlyPayment(monthlyPayment, loan) {
  let principal = loan.get('principal'),
    interestRate = loan.get('interestRate'),
    term;

  term = calculateTerm(principal, interestRate, monthlyPayment);

  return loan.merge({monthlyPayment, term,});
}

function updateTerm(term, loan) {
  let principal = loan.get('principal'),
    interestRate = loan.get('interestRate'),
    monthlyPayment;

  monthlyPayment = calculateMonthlyPayment(principal, interestRate, term);

  return loan.merge({monthlyPayment, term,});
}

export default {
  createLoan,
  updatePrincipal,
  updateInterestRate,
  updateMonthlyPayment,
  updateTerm,
};
