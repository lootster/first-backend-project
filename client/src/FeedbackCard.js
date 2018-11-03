import React from "react";

const FeedbackCard = props => {
  const {
    index,
    feedback: { userName, session, feedbackPositive, feedbackNegative }
  } = props;
  return (
    <div className="col-sm-4">
    <div className="card border-dark mb-3">
      <h3 className="card-header">{`Feedback : ${index + 1}`}</h3>
      <div className="card-body">
        <h5 className="card-title">Title of the session</h5>
        <p className="card-text">{session}</p>
        <h5 className="card-title">Comments about the session</h5>
        <p className="card-text">{feedbackPositive}</p>
        <h5 className="card-title">Suggestions for the session</h5>
        <p className="card-text">{feedbackNegative}</p>
        <div className="card-footer">
          <small className="text-muted">{`Feedback from : ${userName}`}</small>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FeedbackCard;
