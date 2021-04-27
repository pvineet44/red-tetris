import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";
import socketClient from 'socket.io-client';
import ReactRouter from 'react-router'

import TetrisProvider from '../components/TetrisProvider';

it("Tetris Provider test with Params", () => {
    const socket = new socketClient('http://localhost:5000')

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ roomName: 'r1', userName: 'p1' });

    const wrapper = shallow(<TetrisProvider socket={socket}/>)
})