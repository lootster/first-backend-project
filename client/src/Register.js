import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.user === undefined) {
          alert("Error! " + response.message);
        } else {
          alert(
            "Success! New user registered with following info:\nUsername: " +
              response.user.username +
              "\nEmail: " +
              response.user.email +
              "\nPlease login with your email and password.\nRe-directing to login page."
          );
          this.setState({ redirect: true });
        }
      });

    this.setState({
      username: "",
      email: "",
      password: ""
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className="register">
        <MuiThemeProvider>
          <form onSubmit={this.handleSubmit}>
            <AppBar title="User Signup" />
            <div className="form-group">
              <label className="user-input">
                <div className="sign-in-message">
                  <h6>Register for an account to view feedback</h6>
                </div>
                <h4>Enter your username:</h4>
                <div className="username-icon">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="eg. sheldon"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                  <i class="fa fa-user" />
                </div>
              </label>
            </div>
            <div className="form-group">
              <label className="user-input">
                <h4>Enter your email: </h4>
                <div className="email-icon">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="eg. sheldon@gmail.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                  <i class="fa fa-envelope" />
                </div>
              </label>
            </div>
            <div className="form-group">
              <label className="user-input">
                <h4>Enter your password:</h4>
                <div className="password-icon">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Contain at least 5 characters"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                  <i class="fa fa-unlock-alt" />
                </div>
              </label>
            </div>
            {this.state.error && (
              <div>
                <p>Error</p>
              </div>
            )}
            <div className="form-group">
              <RaisedButton
                label="Submit"
                primary={true}
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Register;
