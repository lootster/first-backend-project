import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: ""
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
      .then(response => console.log(response))

    this.setState({
      username: "",
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <div className="register">
        <MuiThemeProvider>
          <form onSubmit={this.handleSubmit}>
            <AppBar title="User Signup" />
            <div className="form-group">
              <label className="user-input">
                <h4>Enter your username:</h4>
                <input
                  className="form-control"
                  type="text"
                  placeholder="sheldon"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="user-input">
                <h4>Enter your email: </h4>
                <input
                  className="form-control"
                  type="email"
                  placeholder="sheldon@gmail.com"
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
