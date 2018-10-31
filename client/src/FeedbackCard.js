import React from "react";

const FeedbackCard = props => {
  const {
    index,
    feedback: { userName, session, feedbackPositive, feedbackNegative }
  } = props;
  return (
    <div className="header" key={index}>
      <h3>{`Feedback: ${index + 1}`}</h3>
      <h4>{userName}</h4>
      <h4>{session}</h4>
      <h6>{feedbackPositive}</h6>
      <h6>{feedbackNegative}</h6>
    </div>
  );
};

export default FeedbackCard;
