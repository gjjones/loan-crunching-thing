module.exports = {
	totalPrincipal: function (interestRate, principal, monthsLeft) {
		var monthlyInterestRate = interestRate/(12*100);
		return ((monthlyInterestRate * principal)/(1-Math.pow(1 + monthlyInterestRate, -monthsLeft)))*monthsLeft;
	},

	paymentsRemaining: function (interestRate, principal, paymentAmt) {
		var monthlyInterestAsDecimal = interestRate / (12 * 100);
		return -Math.log(1 - monthlyInterestAsDecimal * principal / paymentAmt) / Math.log(1 + monthlyInterestAsDecimal);
	}
}