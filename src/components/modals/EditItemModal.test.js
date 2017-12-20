import React from "react";
import { shallow } from "enzyme";
import EditItemModal from "./EditItemModal";

it("renders without crashing", () => {
  const defaultProps = { item: {}, onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<EditItemModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
