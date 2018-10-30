import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userName: "",
      session: "",
      feedbackPositive: "",
      feedbackNegative: "",
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

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Choose your name: 
          <input
            type="text"
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          What was the title of the session? 
          <input
            type="text"
            name="session"
            value={this.state.session}
            onChange={this.handleChange}
          />
        </label>
        <label>
          What was good about the session? 
          <input
            type="text"
            name="feedbackPositive"
            value={this.state.feedbackPositive}
            onChange={this.handleChange}
          />
        </label>
        <label>
          What could be improved? 
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
