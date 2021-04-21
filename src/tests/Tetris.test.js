import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";
import App from "../App";

import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import Tetris, { Tetris as TetrisObj } from '../components/Tetris';
import socketClient from 'socket.io-client';
import { checkCollision, createStage } from "../gameHelpers";

it("Test tetris movement", async () => {
    const socket = new socketClient('http://localhost:5000')
    const { getByText, getByTestId, findByText, debug } = render(<Tetris socket={socket} />);
    fireEvent.click(getByText("Start Game"));
    fireEvent.keyDown(getByTestId("tetris-wrapper"), { keyCode: 37 });
    fireEvent.keyDown(getByTestId("tetris-wrapper"), { keyCode: 38 });
    fireEvent.keyDown(getByTestId("tetris-wrapper"), { keyCode: 39 });
    fireEvent.keyDown(getByTestId("tetris-wrapper"), { keyCode: 40 });
    fireEvent.keyUp(getByTestId("tetris-wrapper"), { keyCode: 40 });

    expect(await findByText(("Start Game"))).toBeInTheDocument
});

it("Test collision", () => {
    const socket = new socketClient('http://localhost:5000')
    const { getByText, getByTestId, findByText } = render(<Tetris socket={socket} />);
    let player = {
        pos: {
            x: 100,
            y: 100,
        },
        tetrimino: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        collided: false,
    }

    let player1 = {
        pos: {
            x: 10,
            y: 10,
        },
        tetrimino: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        collided: false,
    }

    let player2 = {
        pos: {
            x: 4,
            y: 0,
        },
        tetrimino: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        collided: false,
    }
    expect(checkCollision(player, createStage(), { x: 0, y: 1 })).toBe(true)
    expect(checkCollision(player1, createStage(), { x: 0, y: 1 })).toBe(undefined)
    expect(checkCollision(player2, createStage(), { x: 0, y: 1 })).toBe(undefined)
});