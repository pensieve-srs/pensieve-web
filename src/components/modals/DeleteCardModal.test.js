import React from "react";
import { shallow } from "enzyme";
import DeleteCardModal from "./DeleteCardModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<DeleteCardModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
