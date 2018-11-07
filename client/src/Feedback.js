import React, { Component } from "react";
import FeedbackCard from "./FeedbackCard";
import { Redirect } from "react-router-dom";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchByName: "",
      redirect: false
    };

    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("user")) {
      console.log("User login session started");
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

  handleChange(event) {
    this.setState({ searchByName: event.target.value.toLowerCase() });
  }

  logout(event) {
    sessionStorage.setItem("user", "");
    sessionStorage.clear();

    this.setState({ redirect: true });

    console.log("User login session ended");
    alert("You have been logged out.");
  }

  render() {
    const { posts, searchByName, redirect } = this.state;

    if (redirect) {
      alert("Please sign in to view feedback.\nRe-directing to login page.");
      return <Redirect to={"/login"} />;
    }

    const filterPosts = posts.filter(item => {
      return (
        item.userName !== null &&
        item.userName.toLowerCase().includes(searchByName)
      );
    });

    const displayFeedbacks =
      filterPosts.length > 0 ? (
        filterPosts.map((item, index) => {
          return <FeedbackCard feedback={item} index={index} key={index} />;
        })
      ) : (
        <div className="no-feedback-card-container">
          <h1>No respondent's name found</h1>
        </div>
      );

    return (
      <div>
        <div className="feedback-card-header">
          <form className="form-inline my-2 my-lg-0">
            <div className="search-icon">
              <input
                className="form-control mr-sm-2"
                id="search-input"
                type="search"
                placeholder="Search feedback by name"
                onChange={this.handleChange}
              />
              <i className="fa fa-search" />
            </div>
          </form>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.logout}
          >
            Logout
          </button>
        </div>
        <div className="row" id="feedback-card-container">
          {displayFeedbacks}
        </div>
      </div>
    );
  }
}

export default Feedback;
