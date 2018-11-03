import React, { Component } from "react";
import FeedbackCard from "./FeedbackCard";
import { Redirect } from "react-router-dom";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      redirect: false
    };

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("user")) {
      console.log("Call user feed");
    } else {
      this.setState({ redirect: true });
    }
  }

  componentDidMount() {
    fetch("/feedbacks", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(posts =>
        this.setState({
          posts
        })
      )
      .catch(err => console.log(err));
  }

  logout(event) {
    sessionStorage.setItem("user", "");
    sessionStorage.clear();
    alert(
      "You have logged out successfully!\nPlease login again to view feedbacks"
    );
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    const displayFeedbacks = this.state.posts.map((item, index) => {
      return <FeedbackCard feedback={item} index={index} key={index} />;
    });
    return (
      <div>
        <div className="header">
          <h5>Click on button below to sign out</h5>
          <button type="button" className="btn btn-danger" onClick={this.logout}>
            Logout
          </button>
        </div>
        <div className="row" id="feedback-card">{displayFeedbacks}</div>
      </div>
    );
  }
}

export default Feedback;
