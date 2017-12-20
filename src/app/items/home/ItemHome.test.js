import React from "react";
import { shallow } from "enzyme";
import ItemHome from "./ItemHome";

it("renders without crashing", () => {
  const routerProps = { history: { push: jest.fn() }, match: { params: {} } };
  const wrapper = shallow(<ItemHome {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
