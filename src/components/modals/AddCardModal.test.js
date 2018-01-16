import React from "react";
import { shallow } from "enzyme";
import AddCardModal from "./AddCardModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<AddCardModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
