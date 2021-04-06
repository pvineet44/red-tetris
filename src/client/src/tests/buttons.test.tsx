import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Buttons } from '../components/Buttons';
import { useState } from 'react';


// const [count, setCount] = useState(0)
Enzyme.configure({ adapter: new Adapter() });

describe('Buttons text', ()=>{
    test('Has increment button', () => {
        const wrapper = shallow(<Buttons count = {2} setCount={() => {}}/>)
        expect(wrapper.find('div').text()).toContain('Increment')
    })
})