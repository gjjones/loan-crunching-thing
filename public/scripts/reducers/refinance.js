import { ADD_LOAN, ADD_LOANS } from '../actions/actions';
import Transforms from '../utils/transform';
import Loan from '../utils/loan';

const initialState = {
  loans: [],
  amountPaidByMonth: [],
  totalAmount: 0,
  monthsToPaidOff: 0
};

export default function (state = initialState, action) {
  var loans = state.loans;
  switch(action.type) {
  case ADD_LOAN:
    var filledInLoan = {
      ...action.loan,
      term: Loan.calculateTerm(action.loan.interestRate, action.loan.principal, action.loan.monthlyPayment)
    };
    loans.push(filledInLoan);
    break;
  case ADD_LOANS:
    var filledInLoans = action.loans.map(function (loan) {
      return {
        ...loan,
        term: Loan.calculateTerm(loan.interestRate, loan.principal, loan.monthlyPayment)
      }
    });
    loans = loans.concat(filledInLoans);
    break;
  }

  var loansAsAmountPaidByMonth = loans.map(Loan.expandAsAmountPaidByMonth);
  var amountPaidByMonth = Transforms.extendListsToLongest(loansAsAmountPaidByMonth)
                                      .reduce(Transforms.combineLists, []);

  var totalAmount = amountPaidByMonth[amountPaidByMonth.length - 1] || 0;
  var monthsToPaidOff = amountPaidByMonth.length;

  return {
    loans,
    amountPaidByMonth,
    totalAmount,
    monthsToPaidOff
  };
}
