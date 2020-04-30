import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Button } from '../Button';

configure({adapter: new Adapter()});

// Snapshot test for Button component
describe('Button ', () => {
    it('should render correctly ', () => {
        const component = shallow(<Button text={'hello world'} />);
        expect(component).toMatchSnapshot();
    });

    // Not really needed covered in snapshot testing
    it('should have the text label ', () => {
        const component = shallow(<Button text={'test label'} />);
        const text = component.find('span').text();
        expect(text).toEqual('test label');
    });
});

describe('Button onClick event testing ', () => {
    it(' Check if onClick function is getting called ', () => {
        const onClickEventFunc = jest.fn();
        const component = mount(<Button onClick={onClickEventFunc} />); // if we would have used shallow then also it would have worked as we are not using any child component
        component.simulate('click');
        expect(onClickEventFunc).toBeCalled();
    });
});
