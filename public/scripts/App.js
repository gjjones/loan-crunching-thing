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


var earnestLoan = require("./earnest");
var sofiLoan = require("./sofi");

var loansAfterRefinance = [earnestLoan, sofiLoan]
              .map(addTerm)
              .map(expandAsTotalAmountPaid);
loansAfterRefinance = Transforms.extendListsToLongest(loansAfterRefinance)
                .reduce(Transforms.combineLists, []);


import React, { Component } from 'react';

class App extends Component {
  render () {
    return (
      <div>
        <h1>Loan Refinancing</h1>
        <h2>Before Refinancing</h2>
        <div>total paid: {loansBeforeRefinance[loansBeforeRefinance.length-1]}</div>
        <div>term in months: {loansBeforeRefinance.length}</div>
        <h2>After Refinancing</h2>
        <div>total paid: {loansAfterRefinance[loansAfterRefinance.length-1]}</div>
        <div>term in months: {loansAfterRefinance.length}</div>
      </div>
    );
  }
}

export default App;