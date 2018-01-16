import React from "react";
import { shallow } from "enzyme";
import Results from "./Results";

it("renders without crashing", () => {
  const defaultProps = { cards: [] };
  const wrapper = shallow(<Results {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
