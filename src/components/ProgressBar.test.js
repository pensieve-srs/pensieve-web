import React from "react";
import { shallow } from "enzyme";
import ProgressBar from "./ProgressBar";

it("renders without crashing", () => {
  const wrapper = shallow(<ProgressBar percent={0} />);
  expect(wrapper).toHaveLength(1);
});
