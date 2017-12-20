import React from "react";
import { shallow } from "enzyme";
import Decks from "./Decks";

jest.mock("./deckActions", () => ({
  fetchDecks: () => Promise.resolve({ data: {} }),
}));

it("renders without crashing", () => {
  const wrapper = shallow(<Decks />);
  expect(wrapper).toHaveLength(1);
});
