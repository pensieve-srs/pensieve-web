import React from "react";
import { shallow } from "enzyme";
import Review from "./Review";

it("renders without crashing", () => {
  const routerProps = { match: { params: {} } };
  const wrapper = shallow(<Review {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
