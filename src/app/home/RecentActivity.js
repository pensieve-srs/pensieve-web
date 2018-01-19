import React, { Component } from "react";
import moment from "moment";
import { Segment, Header } from "semantic-ui-react";
import { BarChart, Bar, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts";

import * as api from "./homeActions";

class RecentActivity extends Component {
  state = { activity: [], range: "weekly" };

  componentWillMount = () => {
    const { range } = this.state;
    this.fetchReviews(range);
  };

  formatToObject = (activity = []) => {
    const data = {};
    activity.forEach(date => {
      data[date._id] = date.count;
    });

    return data;
  };

  formatActivity = activity => {
    const numDays = 7;
    return new Array(numDays)
      .fill(0)
      .map((_, i) => {
        const date = moment().subtract(i, "days");
        const dateString = date.format("Y-MM-DD");
        const value = activity[dateString] || 0;
        return {
          name: date.format("ddd"),
          value: value,
        };
      })
      .reverse();
  };

  fetchReviews = range => {
    api.fetchReviews(range).then(
      ({ data }) => {
        this.setState({ activity: this.formatToObject(data) });
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  render() {
    const { activity } = this.state;
    const chartData = this.formatActivity(activity);

    return (
      <Segment className="mt-4">
        <Header>Recent Activity</Header>
        <div className="border bg-light rounded p-2">
          <ResponsiveContainer height={200} width="100%">
            <BarChart data={chartData} padding={{ top: 10, bottom: 0, left: 0, right: 0 }}>
              <Bar dataKey="value" fill="#00b5ad" barSize={40} shape={<Rectangle radius={3} />} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} height={15} fontSize="12px" />
              <YAxis dataKey="value" axisLine={false} tickLine={false} width={30} fontSize="12px" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Segment>
    );
  }
}

export default RecentActivity;
