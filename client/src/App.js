import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
  // Redirect
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Feedback from "./Feedback";
import Navigation from "./Navigation";
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/feedback" component={Feedback} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
