//*-------- React and library imports --------->
import React from "react";
import { useBudget } from "../../Context/BudgetContext";

//*-------- Balance component definition --------->
const Balance = () => {
  //*-------- Access budget state and dispatch function using useBudget hook --------->
  const { budget, dispatch } = useBudget();
  const { totalBudget, availableBudget, spent } = budget;

  //*---------- Reset Budget Function ------------>
  const resetBudget = () => {
    let newBudget = window.prompt("Enter your budget");
    while (newBudget==="" || newBudget < spent || /[^0-9.]/g.test(newBudget)) {
      alert("You Already Spent more than that. . . .")
      newBudget = window.prompt("Enter your budget");
    }
    return dispatch({
      type: "SET_BUDGET",
      payload: parseFloat(newBudget),
    })
  }

  //*-------- Render the Balance component with budget-related information --------->
  return (
    <section className="balance-show">
      {/* Display initial budget and reset button */}
      <div className="initial-budget">
        <h1>
          <span>Budget:</span>
          <span>₹{(totalBudget && totalBudget >= 0) ? totalBudget : "______"}</span>
        </h1>
        {/* Button to reset the budget */}
        <button
          title="Reset Budget"
          onClick={resetBudget}
        >
          Reset Budget
        </button>
      </div>
      {/* Display remaining budget and total spent */}
      <div className="expenses-counts">
        <h1>
          <span>Remaining:</span>
          <span>₹{(availableBudget && availableBudget >= 0) ? availableBudget : "______"}</span>
        </h1>
        <h1>
          <span>Spent so far:</span>
          <span>₹{spent}</span>
        </h1>
      </div>
    </section>
  );
};

//*-------- Export the Balance component --------->
export default Balance;
