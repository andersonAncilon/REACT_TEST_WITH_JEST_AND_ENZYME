import React from "react";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

// Enzyme "debug()" show the rendered componente DOM tree

test("renders learn react link", () => {
  const wrapper = shallow(<App />);
});
