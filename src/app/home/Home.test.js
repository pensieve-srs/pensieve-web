import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

jest.mock("./homeActions", () => ({
  fetchDueCards: () => Promise.resolve({ data: {} }),
  fetchNewCards: () => Promise.resolve({ data: {} }),
  fetchUserCounts: () => Promise.resolve({ data: {} }),
}));

it("renders without crashing", () => {
  const routerProps = { history: { push: jest.fn() } };
  const wrapper = shallow(<Home {...routerProps} />);
  expect(wrapper).toHaveLength(1);
});
