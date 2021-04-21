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
import {renderHook, act} from '@testing-library/react-hooks'
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { checkCollision, createStage } from "../gameHelpers";
import TestingDemo from '../components/TestingDemo';


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

it("usePlayer test", () => {
  
  const {result} = renderHook(() => usePlayer());
  const f = result.current[3];
  act(() => {
    console.log(f(createStage(), 1));
  });
  console.log(result.current[3]);
})

it("useStage test", () => {

  const resetMock = jest.fn();
  let player = {
    pos: {
        x: 10,
        y: 10,
    },
    tetrimino: [
        [0, 'I', 0, 0],
        [0, 'I', 0, 0],
        [0, 'I', 0, 0],
        [0, 'I', 0, 0]
    ],
    collided: true,
}

let stage = [
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ 
      ["O", "merged"],  ["O", "merged"], ["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],
  ],
]

  const { result } = renderHook(() => useStage(player, resetMock))
  console.log('result. currant', result.current[3]);
  const f = result.current[3];
  act(() => {
    f(stage)
  })
})

it("useStage test returns", () => {

  const resetMock = jest.fn();
  let player = {
    pos: {
        x: 10,
        y: 10,
    },
    tetrimino: [
        [0, 'I', 0, 0],
        [0, 'I', 0, 0],
        [0, 'I', 0, 0],
        [0, 'I', 0, 0]
    ],
    collided: false,
}

let stage = [
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"],  [0, "clear"]],
  [ 
      ["O", "merged"],  ["O", "merged"], ["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],["O", "merged"],
  ],
]

  const { result } = renderHook(() => useStage(player, resetMock))
  console.log('result. currant', result.current[3]);
  const f = result.current[3];
  act(() => {
  f(stage)
  })
})


it("useInterval stage", () => {
  // const wrapper = shallow(<Welcome />);
  const { getByText } = render(<TestingDemo />);
  // const callbackMock = jest.fn();
  // useInterval(callbackMock, 1000);

})


describe("useInterval stage", () => {
  // const wrapper = shallow(<Welcome />);
  let callback = jest.fn();

  beforeAll(() => {
    // we're using fake timers because we don't want to
    // wait a full second for this test to run.
    jest.useFakeTimers();
  });

  afterEach(() => {
    callback.mockRestore();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should init hook with delay', () => {
    const { result } = renderHook(() => useInterval(callback, 5000));

    expect(result.current).toBeUndefined();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);
  });

  test('should repeatedly calls provided callback with a fixed time delay between each call', () => {
    const { result } = renderHook(() => useInterval(callback, 200));
    expect(callback).not.toHaveBeenCalled();

    // fast-forward time until 1s before it should be executed
    jest.advanceTimersByTime(199);
    expect(callback).not.toHaveBeenCalled(); // FAILS

    // jest.getTimerCount() here returns 0

    // fast-forward until 1st call should be executed
    jest.advanceTimersToNextTimer(1);
    expect(callback).toHaveBeenCalledTimes(1);

    // fast-forward until next timer should be executed
    jest.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalledTimes(2);

    // fast-forward until 3 more timers should be executed
    jest.advanceTimersToNextTimer(3);
    expect(callback).toHaveBeenCalledTimes(5);
  });
})