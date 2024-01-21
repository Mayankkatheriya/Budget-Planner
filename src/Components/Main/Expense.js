//*------ React and library imports ------>
import React from "react";
import { useBudget } from "../../Context/BudgetContext";

//*------ Expense component definition ------>
const Expense = () => {
  //*------ Access budget state and dispatch function using useBudget hook ------>
  const { budget, dispatch } = useBudget();
  const { expenses } = budget;

  //*------ Render the Expense component with a list of expenses ------>
  return (
    <section className="expense-list">
      <h2>Expenses</h2>
      {/* Display a message if no expenses are present, otherwise, render the expense items */}
      {expenses.length === 0 ? (
        <p>Add Data To List . . . . .</p>
      ) : (
        expenses.map((item, index) => {
          return (
            <div key={item.id} className="item-card">
              {/* Display the item number and product name */}
              <span>
                {index + 1}
                {". "}
                {item.product}
              </span>
              {/* Display the item price and delete button */}
              <div>
                <span>₹{item.price}</span>
                {/* Button to delete the expense item */}
                <button
                  title="Delete"
                  onClick={() =>
                    dispatch({
                      type: "DELETE",
                      payload: { id: item.id, price: item.price },
                    })
                  }
                >
                  ❌
                </button>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

//*------ Export the Expense component ------>
export default Expense;
