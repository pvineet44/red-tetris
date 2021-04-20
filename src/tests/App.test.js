import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";
import App from "../App";
import Welcome from "../components/Welcome";

import { render, fireEvent } from "@testing-library/react";
import ToggleSound from '../components/ToggleSound';
import { MemoryRouter } from 'react-router';
import { useInterval } from '../hooks/useInterval';

it("renders without crashing", () => {
  const app = shallow(<App />);
  const { getByText, getByPlaceholderText } = render(<MemoryRouter><App><Welcome/></App></MemoryRouter>);
});

it("test welcome screen", () => {
  const wrapper = shallow(<Welcome />);
  expect(wrapper.find('h1').text()).toContain('Tetris')

  const { getByText, getByPlaceholderText } = render(<Welcome />);
  const input = getByPlaceholderText("Enter your name here:");
  fireEvent.change(input, { target: { value: "vparekh" } })
  fireEvent.click(getByText("Play!"))
});

it("test toggle sound", () => {
  const mockfn = jest.fn();
  const { getByTestId } = render(<ToggleSound soundOn={false} toggleSound={mockfn} />);
  expect(getByTestId("toggle-sound-checkbox")).toHaveProperty("checked", false)
});

// it("useInterval test", () => {
//   const mockfn = jest.fn();
//   const wrapper = shallow(useInterval( mockfn, 1000));

//   // expect(useInterval( mockfn, 1000)).toBe(undefined)
// })
