import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWapper for the App component
 * @function setup
 * @param {object} state - Initial state for setup
 * @param {any} state - Initial state for setup
 * @return {ShalloeWapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Values of data-test attribute for search.
 * @return {ShalloeWapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

it("render without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

it("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

it("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

it("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

it("click button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

it("display decrement button", () => {
  const counter = 10;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);

  button.simulate("click");
  expect(wrapper.find("[data-test='decrement-button']").length).toBe(1);

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

it("display decrement button toBeGreaterThan 0", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);

  button.simulate("click");
  expect(wrapper.find("[data-test='decrement-button']").length).toBe(1);

  const counterDisplay = findByTestAttr(wrapper, "counter-display");

  expect(counterDisplay.text()).toContain("Counter is NOT");
});
