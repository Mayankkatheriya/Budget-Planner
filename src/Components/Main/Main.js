//*--------- React and library imports ------------>
import React, { useEffect, useState } from "react";
import { useBudget } from "../../Context/BudgetContext";

//*--------- Component imports ------------>
import Aside from "../Aside/Aside";
import Balance from "./Balance";
import Expense from "./Expense";

//*--------- Main component definition ------------>
const Main = () => {
  //*--------- Access budget state and dispatch function using useBudget hook ------------>
  const { budget, dispatch } = useBudget();
  const { totalBudget } = budget;

  //*--------- Initial check for total budget, prompt user if not set ------------>
  useEffect(() => {
    if (totalBudget === "") {
      //*--------- Set budget using SET_BUDGET action type ------------>
      dispatch({
        type: "SET_BUDGET",
        payload: parseFloat(window.prompt("Enter your budget")),
      });
    }
  }, [totalBudget, dispatch]);

  //*--------- Render the Main component with Aside, Balance, and Expense components ------------>
  return (
    <div className="content">
      <Aside />
      <main>
        <Balance />
        <Expense />
      </main>
    </div>
  );
};

//*--------- Export the Main component ------------>
export default Main;
