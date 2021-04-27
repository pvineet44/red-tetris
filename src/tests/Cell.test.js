import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
configure({ adapter: new Adapter() });
import React from "react";

import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import Cell from '../components/Cell';

it("Cell test", () => {
    const { } = render(<Cell type = {'I'}/>);
})