export const ADD_LOAN = "ADD_LOAN";
export const ADD_LOANS = "ADD_LOANS";

export function addLoan(loan) {
	return {
		type: ADD_LOAN,
		loan
	}	
}

export function addLoans(loans) {
	return {
		type: ADD_LOANS,
		loans
	}
}