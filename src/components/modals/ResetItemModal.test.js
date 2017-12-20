import React from "react";
import { shallow } from "enzyme";
import ResetItemModal from "./ResetItemModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<ResetItemModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
