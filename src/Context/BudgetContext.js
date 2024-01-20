//*--------- React imports ------------->
import React, { createContext, useContext, useReducer } from "react";

//*--------- Create a context for managing budget-related state ------------->
export const BudgetContext = createContext();

//*--------- BudgetProvider component definition ------------->
const BudgetProvider = ({ children }) => {
  //*--------- Reducer function to handle budget-related actions ------------->
  const reducer = (state, action) => {
    switch (action.type) {
      //*--------- Set the budget, update available budget, and store in local storage ------------->
      case "SET_BUDGET":
        const setBudget = {
          ...state,
          totalBudget: action.payload,
          availableBudget: action.payload - state.spent,
        };
        localStorage.setItem("Expenses", JSON.stringify(setBudget));
        return setBudget;

      //*--------- Add an expense, update available budget, spent, and store in local storage ------------->
      case "ADD_EXPENSE":
        const newData = {
          ...state,
          availableBudget: state.availableBudget - action.payload.price,
          spent: state.spent + action.payload.price,
          expenses: [...state.expenses, action.payload],
        };
        localStorage.setItem("Expenses", JSON.stringify(newData));
        return newData;

      //*--------- Delete an expense, update available budget, spent, and store in local storage ------------->
      case "DELETE":
        let newExpenseList = state.expenses.filter(
          (item) => item.id !== action.payload.id
        );
        const removedData = {
          ...state,
          expenses: newExpenseList,
          availableBudget: state.availableBudget + action.payload.price,
          spent: state.spent - action.payload.price,
        };
        localStorage.setItem("Expenses", JSON.stringify(removedData));
        return removedData;

      //*--------- Default case returns the current state ------------->
      default:
        return state;
    }
  };

  //*--------- Initial state values ------------->
  const states = {
    totalBudget: "",
    availableBudget: "",
    spent: 0,
    expenses: [],
  };

  //*--------- Initialize state from local storage or default values using useReducer ------------->
  const initState = JSON.parse(localStorage.getItem("Expenses")) || states;
  const [budget, dispatch] = useReducer(reducer, initState);

  //*--------- Provide budget context to children components ------------->
  return (
    <BudgetContext.Provider value={{ budget, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

//*--------- Export the BudgetProvider component ------------->
export default BudgetProvider;

//*--------- Custom hook for using global states ------------->
export const useBudget = () => {
  const ctx = useContext(BudgetContext);
  return ctx;
};
