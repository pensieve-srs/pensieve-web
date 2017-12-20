import React from "react";
import { shallow } from "enzyme";
import AddItemModal from "./AddItemModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<AddItemModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
