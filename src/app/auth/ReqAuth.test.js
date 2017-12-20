import React from "react";
import ReqAuth from "./ReqAuth";
import { shallow } from "enzyme";
import cookie from "js-cookie";

const Test = () => <div>test</div>;
const Component = ReqAuth(Test);

it("renders without crashing", () => {
  const wrapper = shallow(<Component history={{ push: jest.fn() }} />);
  expect(wrapper).toHaveLength(1);
});
it("redirects to base route if `token` cookie is not present", () => {
  const changeRouter = jest.fn();
  shallow(<Component history={{ push: changeRouter }} />);
  expect(changeRouter).toHaveBeenCalled();
});
it("does not redirect page if `token` cookie is present", () => {
  const changeRouter = jest.fn();
  cookie.set("token", "test");
  shallow(<Component history={{ push: changeRouter }} />);
  expect(changeRouter).not.toHaveBeenCalled();
});
