import React from "react";
import { shallow } from "enzyme";
import DeckNew from "./DeckNew";

it("renders without crashing", () => {
  const routerProps = { history: { push: jest.fn() } };
  const wrapper = shallow(<DeckNew {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
