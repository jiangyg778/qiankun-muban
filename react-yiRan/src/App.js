import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import Control from "@/pages/control";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
