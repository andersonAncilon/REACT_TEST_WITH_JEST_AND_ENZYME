import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

/**
 * Factory function to create a ShallowWrapper
 * @param {object} props
 * @param {any} state
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);

  if (state) wrapper.setState(state);

  return wrapper;
};

/**
 * Function to find a element on wrapper
 * @param {ShallowWrapper} wrapper
 * @param {string} val
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  expect(incrementButton.length).toBe(1);
});

test('renders decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  expect(decrementButton.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking increment button increments counter display', () => {
  const counter = 7;

  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');

  expect(counterDisplay.text()).toContain(counter + 1);
});

test('click decrement button decrements counter display', () => {
  const counter = 2;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');

  expect(counterDisplay.text()).toContain(counter - 1);
});

test('state doesnt go below zero', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
});

test('renders error message', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const errorMessage = findByTestAttr(wrapper, 'error-message');

  expect(errorMessage.length).toBe(1);
});

test('error message will desappear', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');

  decrementButton.simulate('click');
  const didErrorAppear = findByTestAttr(wrapper, 'error-message');
  incrementButton.simulate('click');
  const didErrorDisappear = findByTestAttr(wrapper, 'error-message');

  const condition = didErrorAppear.length && !didErrorDisappear.length;

  expect(condition).toBeTruthy();
});
