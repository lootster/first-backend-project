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
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
        } else {
          console.log("Login Error");
        }
      });

    this.setState({
      email: "",
      password: "",
    });
  }

  logout(event) {
    sessionStorage.setItem("user", "");
    sessionStorage.clear();
  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/feedback'} />)
    }

    return (
      <div className="login">
        <MuiThemeProvider>
          <div>
          <form onSubmit={this.login}>
            <AppBar title="User Login Form" />
            <div className="form-group">
              <label className="user-input">
                <h4>Enter your email: </h4>
                <input
                  className="form-control"
                  type="email"
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
          <RaisedButton
            label="Logout"
            primary={true}
            type="logout"
            value="logout"
            onClick={event => this.logout(event)}
          />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
