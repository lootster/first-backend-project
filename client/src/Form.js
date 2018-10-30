import React, { Component } from "react";

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
    alert("A feedback was submitted by " + this.state.userName);

    event.preventDefault();

    fetch("/feedbacks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h3>Your name:</h3>
          <input
            type="text"
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <h3>What was the title of the session?</h3>
          <input
            type="text"
            name="session"
            value={this.state.session}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <h3>What was good about the session?</h3>
          <input
            type="text"
            name="feedbackPositive"
            value={this.state.feedbackPositive}
            onChange={this.handleChange}
          />
        </label>
        <label>
          <h3>What could be improved?</h3>
          <input
            type="text"
            name="feedbackNegative"
            value={this.state.feedbackNegative}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
