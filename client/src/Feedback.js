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
  }

  componentWillMount() {
    if(sessionStorage.getItem('user')){
      console.log("Call user feed");
    }
    else{
      this.setState({redirect: true});
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

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/login'} />)
    }

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
