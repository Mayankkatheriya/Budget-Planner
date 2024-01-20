import BudgetProvider from "../Context/BudgetContext";
import Main from "./Main/Main";

function App() {
  return (
    <BudgetProvider>
      <div className="App">
        <h1 className="header">Budget Planner</h1>
        <Main />
      </div>
    </BudgetProvider>
  );
}

export default App;
