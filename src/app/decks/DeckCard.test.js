import React from "react";
import { shallow } from "enzyme";
import DeckCard from "./DeckCard";

it("renders without crashing", () => {
  const defaultProps = { deck: {} };
  const wrapper = shallow(<DeckCard {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
