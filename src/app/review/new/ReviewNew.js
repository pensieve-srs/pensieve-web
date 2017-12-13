import React, { Component } from "react";
import cookie from "js-cookie";
import axios from "axios";
import queryString from "query-string";

class ReviewNew extends Component {
  componentWillMount() {
    const { sessionType } = this.props.match.params;
    const { deckId } = queryString.parse(this.props.location.search);

    const config = { headers: { Authorization: cookie.get("token") } };

    axios.post("/api/sessions", { sessionType, deckId }, config).then(
      response => {
        this.props.history.push(`/sessions/${response.data.session._id}`);
      },
      error => {
        console.log("error", error);
      },
    );
  }

  render() {
    return (
      <div className="pt-5">
        <div className="col-md-8 offset-md-2 text-center pt-5">
          <h3>Creating your study session...</h3>
        </div>
      </div>
    );
  }
}

export default ReviewNew;
