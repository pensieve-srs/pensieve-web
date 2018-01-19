import React from "react";
import { shallow } from "enzyme";
import FlashMessage from "./FlashMessage";

it("renders without crashing", () => {
  const wrapper = shallow(<FlashMessage />);
  expect(wrapper).toHaveLength(1);
});
