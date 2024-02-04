// Learing Redux in isolation

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":{
        if(state.balance>0)
        return { ...state, loan: state.loan + action.payload };
    }
    case "account/payLoan":
      return { ...state, loan: 0 };
    default : return state;
  }
}