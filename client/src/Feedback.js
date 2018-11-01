import React, { Component } from "react";
import FeedbackCard from "./FeedbackCard";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
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

  render() {
    const displayFeedbacks = this.state.posts.map((item, index) => {
      return <FeedbackCard feedback={item} index={index} key={index} />;
    });
    return (
      <div className="row">
        {displayFeedbacks}
      </div>
    );
  }
}

export default Feedback;
