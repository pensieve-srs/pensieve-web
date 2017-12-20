import React from "react";
import DeckHome from "./DeckHome";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const routerProps = { match: { params: {} } };
  const wrapper = shallow(<DeckHome {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
