function calculateTerm(principal, interestRate, paymentAmt) {
  var interestPerPayPeriod = interestRate / (12 * 100);
  return -Math.log(1 - interestPerPayPeriod * principal / paymentAmt) /
          Math.log(1 + interestPerPayPeriod);
}

function calculateMonthlyPayment(principal, interestRate, term) {
  var interestPerPayPeriod = interestRate / (12 * 100);
  return principal * interestPerPayPeriod /
          (1 - Math.pow(1 + interestPerPayPeriod, -term));
}

export default {
  calculateTerm,
  calculateMonthlyPayment
};
