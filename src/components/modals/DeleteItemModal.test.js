import React from "react";
import { shallow } from "enzyme";
import DeleteItemModal from "./DeleteItemModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<DeleteItemModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
