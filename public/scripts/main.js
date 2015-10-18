var Loan = require('./loan');
var Transforms = require('./transforms');


function addTerm (loan) {
	loan.term = Loan.paymentsRemaining(loan.interestRate, loan.principal, loan.monthlyPayment);
	return loan;
}

function expandAsTotalAmountPaid(loan) {
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


var federalLoans = require("./nelnet");
var mohelaLoan = require("./mohela");

var loansBeforeRefinance = federalLoans.concat(mohelaLoan)
							.map(addTerm)
							.map(expandAsTotalAmountPaid);
loansBeforeRefinance = Transforms.extendListsToLongest(loansBeforeRefinance)
								.reduce(Transforms.combineLists, []);

console.log(loansBeforeRefinance[loansBeforeRefinance.length-1]);
console.log(loansBeforeRefinance.length);



var earnestLoan = require("./earnest");
var sofiLoan = require("./sofi");

var loansAfterRefinance = [earnestLoan, sofiLoan]
							.map(addTerm)
							.map(expandAsTotalAmountPaid);
loansAfterRefinance = Transforms.extendListsToLongest(loansAfterRefinance)
								.reduce(Transforms.combineLists, []);

console.log(loansAfterRefinance[loansAfterRefinance.length-1]);
console.log(loansAfterRefinance.length);