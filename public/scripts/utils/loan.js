function calculateTerm(interestRate, principal, paymentAmt) {
  var interestPerPayPeriod = interestRate / (12 * 100);
  return -Math.log(1 - interestPerPayPeriod * principal / paymentAmt) / Math.log(1 + interestPerPayPeriod);
}

function calculateMonthlyPayment(interestRate, principal, term) {
  var interestPerPayPeriod = interestRate / (12 * 100);
  return principal * interestPerPayPeriod / (1 - Math.pow(1 + interestPerPayPeriod, -term));
}

function calculateTotalPaid(interestRate, principal, term) {
  return calculateMonthlyPayment(interestRate, principal, term) * term;
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
  calculateTerm,
  expandAsAmountPaidByMonth
}
