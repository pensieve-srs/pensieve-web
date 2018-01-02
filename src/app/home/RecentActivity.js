import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import { BarChart, Bar, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts";

// TODO: FAKE DATA. Replace with real values
const data = [
  { name: "Mon", value: 100 },
  { name: "Tue", value: 124 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 65 },
  { name: "Fri", value: 40 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 200 },
];

class RecentActivity extends Component {
  render() {
    return (
      <Segment className="mt-4">
        <Header>Recent Activity</Header>
        <div className="border bg-light rounded p-2">
          <ResponsiveContainer height={200} width="100%">
            <BarChart data={data} padding={{ top: 10, bottom: 0, left: 0, right: 0 }}>
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
