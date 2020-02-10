import React from "react";
import App from "./App";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

test("renders learn react link", () => {});
