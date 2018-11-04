import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("user")) {
      this.setState({ redirect: true });
      console.log("Sign out before viewing login page");
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login(event) {
    event.preventDefault();

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        let responseJSON = response;
        if (responseJSON.user) {
          sessionStorage.setItem("user", responseJSON);
          this.setState({ redirect: true });
          console.log(this.state.redirect);
        } else {
          console.log("Login Error");
        }
      });

    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/feedback"} />;
    }

    return (
      <div className="login">
        <MuiThemeProvider>
          <div>
            <form onSubmit={this.login}>
              <AppBar title="User Login" />
              <div className="form-group">
                <label className="user-input">
                  <div className="sign-in-message">
                    <h6>Please sign in below to view feedback</h6>
                  </div>
                  <h4>Enter your email: </h4>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your registered email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="user-input">
                  <h4>Enter your password:</h4>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter your registered password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <RaisedButton
                  label="Login"
                  primary={true}
                  type="login"
                  value="login"
                />
              </div>
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
