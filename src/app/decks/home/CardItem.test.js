import React from "react";
import CardItem from "./CardItem";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const defaultProps = { card: {} };
  const wrapper = shallow(<CardItem {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
