import React from "react";
import Logout from "./Logout";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const routerProps = { history: { push: jest.fn() } };
  const wrapper = shallow(<Logout {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
