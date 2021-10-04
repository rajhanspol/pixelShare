import App from "./App";
import ReactDOM from "react-dom";
import { ContextProvider } from "../src/Context/Context";
import {BrowserRouter as Router} from 'react-router-dom'
import { AuthContextProvider } from "./Context/AuthContext";

//  Use basename for ghPages - react-router fix
ReactDOM.render(
  <AuthContextProvider>
    <ContextProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </ContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

