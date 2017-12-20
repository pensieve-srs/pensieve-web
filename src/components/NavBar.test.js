import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";

it("renders without crashing", () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper).toHaveLength(1);
});
