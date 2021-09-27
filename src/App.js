import React from "react";
import MainPage from "./Pages/MainPage";
import {Switch, Route} from 'react-router-dom'
import UserContent from "./Pages/UserContent";
import SignInPage from "./Components/LoginandSignIn/signInPage";
import LogInPage from "./Components/LoginandSignIn/logInPage";
import "./index.css"


function App() {
  return (
    <React.Fragment>
      <Switch>

        <Route exact path='/'>
          <MainPage />
        </Route>
        
        <Route path="/usercontent">
          <UserContent />
        </Route>
        
        <Route path="/signin">
          <SignInPage />
        </Route>

        <Route path="/login" >
          <LogInPage />
        </Route>


      </Switch>



        
    </React.Fragment>
  );
}

export default App;
