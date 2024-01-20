// React and library imports
import React, { useState } from "react";
import { useBudget } from "../../Context/BudgetContext";
import { nanoid } from "nanoid";

//*----------- Aside component definition ------------->
const Aside = () => {
  //*----------- Access budget state and dispatch function using useBudget custom hook ------------->
  const { budget, dispatch } = useBudget();
  const { availableBudget } = budget;

  //*----------- Local state for input fields ------------->
  const [inputProduct, setProduct] = useState("");
  const [inputPrice, setPrice] = useState("");

  //*----------- Handle adding expenses when the form is submitted ------------->
  const handleAddExpenses = (e) => {
    e.preventDefault();

    //*----------- Check if the entered price exceeds the available budget ------------->
    if (parseFloat(inputPrice) > availableBudget) {
      alert("Your budget has been exceeded!");
      return;
    }

    //*----------- Add a new expense to the budget state ------------->
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        product: inputProduct,
        price: parseFloat(inputPrice),
        id: nanoid(),
      },
    });

    //*----------- Clear input fields after adding expense ------------->
    setProduct("");
    setPrice("");
  };

  //*----------- Render the Aside component with an add expenses form ------------->
  return (
    <aside>
      <section className="add-expenses-form">
        <h2>Add Expenses</h2>
        <form onSubmit={handleAddExpenses}>
          {/*------- Input field for product name------- */}
          <div className="product">
            <label htmlFor="">Product</label>
            <input
              type="text"
              placeholder="Enter Item Name"
              value={inputProduct}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
              required
            />
          </div>
          {/*----- Input field for item price----- */}
          <div className="price">
            <label htmlFor="">Price</label>
            <input
              type="Number"
              placeholder="Enter Item Price"
              value={inputPrice}
              min={1}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              required
            />
          </div>
          {/*----- Button to add the item----- */}
          <button title="Add Item">Add</button>
        </form>
      </section>
    </aside>
  );
};

//*----------- Export the Aside component ------------->
export default Aside;
