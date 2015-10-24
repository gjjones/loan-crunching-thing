function totalPrincipal(interestRate, principal, monthsLeft) {
  var monthlyInterestRate = interestRate/(12*100);
  return ((monthlyInterestRate * principal)/(1-Math.pow(1 + monthlyInterestRate, -monthsLeft)))*monthsLeft;
}

function paymentsRemaining(interestRate, principal, paymentAmt) {
  var monthlyInterestAsDecimal = interestRate / (12 * 100);
  return -Math.log(1 - monthlyInterestAsDecimal * principal / paymentAmt) / Math.log(1 + monthlyInterestAsDecimal);
}

function withTerm(loan) {
	return Object.assign({
		term: paymentsRemaining(loan.interestRate, loan.principal, loan.monthlyPayment)
	}, loan);
}

function fillInData(loan) {
	if (!loan.term) {
		return withTerm(loan);
	}
	return loan;
}

function expandAsAmountPaidByMonth(loan) {
  var amountByMonth = [];
  amountByMonth.length = Math.ceil(loan.term);
  return amountByMonth.fill(undefined)
      .map(function(_, index) {
        index++; // needs to be 1-based for mathy stuff
        var paymentsMade = (loan.term > index) ? index : loan.term;
        return {
          monthlyPayment: loan.monthlyPayment,
          paymentsMade: paymentsMade
        }
      })
      .map(function (paymentsInfo) {
        return paymentsInfo.paymentsMade * paymentsInfo.monthlyPayment;
      });
}
module.exports = {
  totalPrincipal,
  paymentsRemaining,
  fillInData,
  expandAsAmountPaidByMonth
}