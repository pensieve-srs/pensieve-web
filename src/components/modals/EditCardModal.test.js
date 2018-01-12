import React from "react";
import { shallow } from "enzyme";
import EditCardModal from "./EditCardModal";

it("renders without crashing", () => {
  const defaultProps = { card: {}, onClose: jest.fn(), onSubmit: jest.fn() };
  const wrapper = shallow(<EditCardModal {...defaultProps} />);
  expect(wrapper).toHaveLength(1);
});
