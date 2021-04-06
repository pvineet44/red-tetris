import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Counter } from '../components/Counter';
import { Buttons } from '../components/Buttons'

Enzyme.configure({ adapter: new Adapter() });

describe('Counter text', ()=>{
    test('Header text text', () => {
        const wrapper = shallow(<Counter/>)
        expect(wrapper.find('h1').text()).toContain('The count is')
    })

    test('Increment Button Test', ()=> {
        const counterWrapper = shallow(<Counter/>)
        expect(counterWrapper.find('p').text()).toEqual('0')

        const wrapper = shallow(<Buttons count = {0} setCount = {(count) => { count = count + 1}}/>)
        wrapper.find('.increment-button').simulate('click')
        expect(counterWrapper.find('p').text()).toEqual('0')
    })

    test('Decrement Button Test', ()=> {
        const counterWrapper = shallow(<Counter/>)
        expect(counterWrapper.find('p').text()).toEqual('0')

        const wrapper = shallow(<Buttons count = {0} setCount={(count) => { count = count - 1}}/>)
        wrapper.find('.decrement-button').simulate('click')
        expect(counterWrapper.find('p').text()).toEqual('0')
    })
})