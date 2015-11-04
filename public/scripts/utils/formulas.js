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

module.exports = {
  calculateTerm,
  calculateMonthlyPayment,
  calculateTotalPaid
}
