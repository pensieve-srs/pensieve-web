import React, { Component } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import pluralize from "pluralize";
import cookie from "js-cookie";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { study: {}, learn: {}, review: {} };
  }

  componentWillMount() {
    const config = { headers: { Authorization: cookie.get("token") } };
    axios.get("/api/study_types", config).then(
      response => {
        const { study, learn, review } = response.data;
        this.setState(() => ({ study, learn, review }));
      },
      error => {
        console.log("error", error);
      },
    );
  }

  render() {
    const { study, learn, review } = this.state;

    return (
      <div className="study-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <h5 className="mb-3">Choose your study type:</h5>
              <div className="list-group">
                <Link
                  to="/sessions/new"
                  className="study-group-item list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">
                      Daily study{" "}
                      <span className="font-weight-normal text-dark">(Recommended)</span>
                    </h5>
                    {study.size && (
                      <div className="badge badge-secondary">
                        {study.size === study.total ? (
                          <span>{pluralize("card", study.size, true)}</span>
                        ) : (
                          <span>
                            {study.size} out of {pluralize("card", study.total, true)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-secondary">
                    This session contains a mixture of new cards and previously seen cards. It
                    focuses on expanding your material while maximizing your recall of cards you
                    have already studied. This is good for balancing your learning session.
                  </p>
                </Link>
                <Link
                  to={`/sessions/new/learn`}
                  className="study-group-item list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">Learn new cards</h5>
                    {learn.size && (
                      <div
                        className={cx("badge", {
                          "badge-secondary": learn.size === 0,
                          "badge-info": learn.size > 0,
                        })}
                      >
                        {learn.size === learn.total ? (
                          <span>{pluralize("card", learn.size, true)}</span>
                        ) : (
                          <span>
                            {learn.size} out of {pluralize("card", learn.total, true)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-secondary">
                    This session only contains cards you have not seen yet. It focuses on
                    introducing you to new material and expanding your knowledge base. This is good
                    if you are trying to learn a lot of material in a short time.
                  </p>
                </Link>
                <Link
                  to={`/sessions/new/review`}
                  className="study-group-item list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">Review previous cards</h5>
                    {review.size && (
                      <div
                        className={cx("badge", {
                          "badge-secondary": review.size === 0,
                          "badge-warning": review.size > 0,
                        })}
                      >
                        {review.size === review.total ? (
                          <span>{pluralize("card", review.size, true)}</span>
                        ) : (
                          <span>
                            {review.size} out of {pluralize("card", review.total, true)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-secondary">
                    This session only contains cards you have already seen and need to review again.
                    It focuses on improving your recall of material you have already learned. These
                    items are due to be reviewed again and will not contain items you have just
                    learned.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
