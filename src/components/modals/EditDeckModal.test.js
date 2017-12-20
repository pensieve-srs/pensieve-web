import React from "react";
import { shallow } from "enzyme";
import EditDeckModal from "./EditDeckModal";

it("renders without crashing", () => {
  const defaultProps = { deck: {}, onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<EditDeckModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
