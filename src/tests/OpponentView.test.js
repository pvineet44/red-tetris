import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";
import { createStage } from '../gameHelpers';
import OpponentView from '../components/OpponentView';
import socketClient from 'socket.io-client';


describe("OpponentStage tests",() => {
    const socket = new socketClient('http://localhost:5000')

    it("OpponentStage test not ready", () => {
        const wrapper = shallow(<OpponentView stage = {createStage()} ready = {false} socket = {socket}/>)
        expect(wrapper.text()).toContain('Cell')
    })
})
    