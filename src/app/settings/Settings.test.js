import React from "react";
import { shallow } from "enzyme";
import Settings from "./Settings";

jest.mock("./userActions", () => ({
  fetchUser: () => Promise.resolve({ data: {} }),
}));

it("renders without crashing", () => {
  const wrapper = shallow(<Settings />);
  expect(wrapper).toHaveLength(1);
});
