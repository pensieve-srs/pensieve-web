import React from "react";
import { shallow } from "enzyme";
import CardHome from "./CardHome";

it("renders without crashing", () => {
  const routerProps = { history: { push: jest.fn() }, match: { params: {} } };
  const wrapper = shallow(<CardHome {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
