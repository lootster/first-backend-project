import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      session: "",
      feedbackPositive: "",
      feedbackNegative: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert("Feedback received and was submitted by " + this.state.userName);

    event.preventDefault();

    fetch("/feedbacks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(res => console.log(res.status));
    
    this.setState({
      userName: "",
      session: "",
      feedbackPositive: "",
      feedbackNegative: ""
    });
  }

  render() {
    return (
      <div className="feedback">
        <MuiThemeProvider>
          <form onSubmit={this.handleSubmit}>
            <AppBar title="Feedback Form" />
            <div className="form-group">
              <label className="feedback-input" >
                <h4>Please enter your full name:</h4>
                <input
                  className="form-control"
                  type="text"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="feedback-input">
                <h4>What was the title of the session?</h4>
                <input
                  className="form-control"
                  type="text"
                  name="session"
                  value={this.state.session}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="feedback-input">
                <h4>What was good about the session?</h4>
                <textarea
                  className="form-control"
                  rows="5"
                  type="text"
                  name="feedbackPositive"
                  value={this.state.feedbackPositive}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="feedback-input">
                <h4>What could be improved?</h4>
                <textarea
                  className="form-control"
                  rows="5"
                  type="text"
                  name="feedbackNegative"
                  value={this.state.feedbackNegative}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
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

export default Form;
