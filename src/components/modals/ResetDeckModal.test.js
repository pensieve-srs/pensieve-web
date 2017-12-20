import React from "react";
import { shallow } from "enzyme";
import ResetDeckModal from "./ResetDeckModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<ResetDeckModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
