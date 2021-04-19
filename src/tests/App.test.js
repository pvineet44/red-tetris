import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

import React from "react";
import App from "../App";
import Welcome from "../components/Welcome";

import { render, fireEvent } from "@testing-library/react";
import Tetris from '../components/Tetris';
import OpponentView from '../components/OpponentView';
import ToggleSound from '../components/ToggleSound';
import socketClient from 'socket.io-client';


it("renders without crashing", () => {
  const app = shallow(<App />);
  
  // const appInstance = app.instance();
  // console.log(appInstance)
});

it("renders without crashing", () => {
  const wrapper = shallow(<Welcome />);
  expect(wrapper).toMatchSnapshot();

  // expect(wrapper.find('div').text()).toContain('Increment')
  expect(wrapper.find('h1').text()).toContain('Tetris')
  
  const { getByText, getByPlaceholderText } = render(<Welcome />);
  const input = getByPlaceholderText("Enter your name here:");
  fireEvent.change(input, { target: { value: "vparekh" }})
  fireEvent.click( getByText("Play!"))
});


const mockTetris = () => {
  const socket = new socketClient('http://localhost:5000')
    // console.log(socket);
    const { getByText } = render(<Tetris />);

    const tetris = shallow(<Tetris socket={socket} />);

    fireEvent.click( getByText("Start Game"))
    tetris.simulate("keydown", {keyCode: 37})
    tetris.simulate("keydown", {keyCode: 38})
    tetris.simulate("keydown", {keyCode: 39})
    // tetris.simulate("keydown", {keyCode: 40})
    // tetris.simulate("keydown", {keyCode: 40})
    let i = 0;
    while ( i++ < 2000)
    tetris.simulate("keydown", {keyCode: 40})
}

it("renders without crashing", async () => {
    mockTetris();
  });

  it("renders without crashing", () => {
    // fireEvent.click( getByText("Start Game"))
    const mockToggleSound = jest.fn();  
    const { getByText, getByTestId } = render(<ToggleSound />);
    // const checkbox = getByTestId("toggle-sound-checkbox");
    // expect(checkbox).toHaveAttribute("checked", "true");
    expect(getByTestId("toggle-sound-checkbox")).toHaveProperty("checked", false)



  });


