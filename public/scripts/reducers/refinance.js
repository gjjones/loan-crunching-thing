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
  switch(action.type) {
  case ADD_LOAN:
    var filledInLoan = Loan.fillInData(action.loan)
    state.loans.push(filledInLoan);
    break;
  case ADD_LOANS:
    var filledInLoans = action.loans.map(Loan.fillInData);
    state.loans = state.loans.concat(filledInLoans);
    break;
  }

  var loansAsAmountPaidByMonth = state.loans.map(Loan.expandAsAmountPaidByMonth);
  state.amountPaidByMonth = Transforms.extendListsToLongest(loansAsAmountPaidByMonth)
                                      .reduce(Transforms.combineLists, []);

  state.totalAmount = state.amountPaidByMonth[state.amountPaidByMonth.length - 1] || 0;
  state.monthsToPaidOff = state.amountPaidByMonth.length;

  return state;
}