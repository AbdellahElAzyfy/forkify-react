import Header from "./components/Header";
import Results from "./components/Results";
import Recipe from "./components/Recipe";
import { AppProvider } from "./AppContext";
import Modal from "./components/Modal";

function App() {
  return (
    <AppProvider>
      <div className="container">
        <Header />
        <Results />
        <Recipe />
      </div>

      <Modal />
    </AppProvider>
  );
}

export default App;
