import React, { Component } from "react";
import moment from "moment";
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis } from "recharts";

import * as api from "./activityActions";

const fmtTick = date => moment(date).format("MMM D");

class ActivityGraph extends Component {
  state = { data: [] };
  componentWillMount() {
    api
      .fetchActivity({ deck: this.props.deck })
      .then(({ data }) => this.setState({ data }))
      .catch(error => console.log("error", error));
  }

  render() {
    const { data } = this.state;
    return (
      <div className="w-100" style={{ height: "200px" }}>
        <ResponsiveContainer>
          <ScatterChart className="mt-3" data={data}>
            <XAxis dataKey="createdAt" tickFormatter={fmtTick} />
            <YAxis dataKey="reviews" />
            <CartesianGrid strokeDasharray="3 3" />
            <Scatter data={data} fill="#1a71f0" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default ActivityGraph;
