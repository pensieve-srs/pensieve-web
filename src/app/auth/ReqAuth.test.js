import React from "react";
import ReqAuth from "./ReqAuth";
import { shallow } from "enzyme";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";

const Test = () => <div>test</div>;
const Component = ReqAuth(Test);

it("renders without crashing", () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toHaveLength(1);
});
it("redirects to base route if `token` cookie is not present", () => {
  const wrapper = shallow(<Component />);
  expect(wrapper.find("Redirect").exists()).toBe(true);
});
it("does not redirect page if `token` cookie is present", () => {
  cookie.set("token", jwt.sign({ foo: "bar" }, "baz"));
  const wrapper = shallow(<Component />);
  expect(wrapper.find("Redirect").exists()).toBe(false);
});
