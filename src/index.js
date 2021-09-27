import App from "./App";
import ReactDOM from "react-dom";
import { ContextProvider } from "../src/Context/Context";
import {HashRouter as Router} from 'react-router-dom'
import { AuthContextProvider } from "./Context/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

