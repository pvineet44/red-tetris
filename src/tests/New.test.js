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
import { renderHook, act } from '@testing-library/react-hooks'
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { checkCollision, createStage } from "../gameHelpers";
import TestingDemo from '../components/TestingDemo';
import Tetris from '../components/Tetris';
import socketClient from 'socket.io-client';
import ReactRouter from 'react-router'

it("usePlayer test -1", () => {

    const { result } = renderHook(() => usePlayer());
    const f = result.current[3];
    act(() => {
      f(createStage(), -1)
    });
  })