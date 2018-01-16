import React from "react";
import { shallow } from "enzyme";
import ResetCardModal from "./ResetCardModal";

it("renders without crashing", () => {
  const defaultProps = { onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<ResetCardModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
