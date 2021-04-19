import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
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
});

it("test welcome screen", () => {
  const wrapper = shallow(<Welcome />);
  expect(wrapper.find('h1').text()).toContain('Tetris')
  
  const { getByText, getByPlaceholderText } = render(<Welcome />);
  const input = getByPlaceholderText("Enter your name here:");
  fireEvent.change(input, { target: { value: "vparekh" }})
  fireEvent.click( getByText("Play!"))
});


const mockTetris = () => {
    const socket = new socketClient('http://localhost:5000')
    const { getByText, getByTestId } = render(<Tetris socket={socket} />);

    // const tetris = shallow(<Tetris socket={socket} />);

    fireEvent.click( getByText("Start Game"))
    
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 39});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 38});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});
    fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 37});

    // tetris.simulate("keydown", {keyCode: 37})
    // tetris.simulate("keydown", {keyCode: 38})
    // tetris.simulate("keydown", {keyCode: 39})
    // tetris.simulate("keydown", {keyCode: 40})
    let i = 0;
    while ( i++ < 250 ) {
      fireEvent.keyDown(getByTestId("tetris-wrapper"), {keyCode: 40});
    }
}

it("test tetris game", async () => {
    mockTetris();
  });

  it("test toggle sound", () => {
    const mockfn = jest.fn();
    const { getByTestId } = render(<ToggleSound soundOn={false} toggleSound = {mockfn} />);
    expect(getByTestId("toggle-sound-checkbox")).toHaveProperty("checked", false)



  });


