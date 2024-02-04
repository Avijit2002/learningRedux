// Learing Redux in isolation

import { combineReducers, createStore } from "redux";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialCustomerState = {
  fullname: "",
  id: "",
  createdAt:""
};


function accountreducer(state = initialAccountState, action) {
  switch (action.type) {
    case "account/deposit": {
      console.log(action);
      return { ...state, balance: state.balance + action.payload };
    }
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.loan,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
      };
    }
    case "account/payLoan":
      return { ...state, loan: 0 };
    default:
      return state;
  }
}


function customerReducer(state = initialCustomerState, action){
  switch(action.type){
    case "customer/createCustomer":{
      return {
        ...state,
        fullname: action.payload.fullname,
        id: action.payload.id,
        createdAt: action.payload.createdAt
      }

    }
    default: return state
  }
}

//Action creator function
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
function createCustomer(name){
  return {
    type: "customer/createCustomer",
    payload:{
      fullname:name,
      id: 2,
      createdAt:new Date
    }
  }
}

//Creating store
const rootReducer = combineReducers({
  account : accountreducer,
  customer : customerReducer
})

const store = createStore(rootReducer);
store.dispatch(deposit(400));

store.dispatch(createCustomer("avijit"))

console.log(store.getState());
