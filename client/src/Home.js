import React from "react";
import Form from "./Form";

const Home = () => {
  return (
    <div>
      <div className="header">
        <h1>Session feedback</h1>
        <p>
          Please help us improve by sharing your honest feedback for the session
          that just happened!
        </p>
      </div>
      <Form />
    </div>
  );
};

export default Home;
