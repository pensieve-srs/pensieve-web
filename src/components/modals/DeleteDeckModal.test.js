import React from "react";
import { shallow } from "enzyme";
import DeleteDeckModal from "./DeleteDeckModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<DeleteDeckModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
