import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";
import { createStage } from '../gameHelpers';
import Stage from '../components/Stage';


describe("Stage tests",() => {
    it("Stage test ready ", () => {
        const wrapper = shallow(<Stage stage = {createStage()} ready = {true}/>)
        expect(wrapper.text()).toContain('Ready!')
    })
    
    it("Stage test not ready", () => {
        const wrapper = shallow(<Stage stage = {createStage()} ready = {false}/>)
        expect(wrapper.text()).toContain('Cell')
    })
})
