import React from "react";
import { shallow } from "enzyme";
import Account from "./Account";

jest.mock("./userActions", () => ({
  fetchUser: () => Promise.resolve({ data: {} }),
}));

it("renders without crashing", () => {
  const wrapper = shallow(<Account />);
  expect(wrapper).toHaveLength(1);
});
