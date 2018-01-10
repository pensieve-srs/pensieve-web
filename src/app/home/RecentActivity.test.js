import React from "react";
import { shallow } from "enzyme";
import RecentActivity from "./RecentActivity";

it("renders without crashing", () => {
  const wrapper = shallow(<RecentActivity />);
  expect(wrapper).toHaveLength(1);
});
