import React from 'react';
import {Tetris, Board} from '../components/tetris'
import {render} from '@testing-library/react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';


Enzyme.configure({ adapter: new Adapter() });

describe('Players count', ()=>{
    test('Board text', () => {
        const wrapper = shallow(<Board/>)
        expect(wrapper.find('h1').text()).toContain('Player')
    })

    test('Player count test', () => {
        const wrapper = shallow(<Board/>)
        expect(wrapper.find('#player-count').text()).toContain('0')
    })

    test('Tetris', () => {
        const wrapper = shallow(<Tetris />)
        expect(wrapper.find('.board-wrapper').text()).toContain('Hello')
    });
})