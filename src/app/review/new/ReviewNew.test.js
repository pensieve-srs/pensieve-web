import React from "react";
import { shallow } from "enzyme";
import ReviewNew from "./ReviewNew";

jest.mock("../reviewActions", () => ({
  createSession: () => Promise.resolve({ data: { session: {} } }),
}));

it("renders without crashing", () => {
  const routerProps = { history: { push: jest.fn() } };
  const wrapper = shallow(<ReviewNew {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
