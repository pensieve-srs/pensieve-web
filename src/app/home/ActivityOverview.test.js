import React from "react";
import { shallow } from "enzyme";
import ActivityOverview from "./ActivityOverview";

it("renders without crashing", () => {
  const wrapper = shallow(<ActivityOverview />);
  expect(wrapper).toHaveLength(1);
});
