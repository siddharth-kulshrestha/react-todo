import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ItemInput from '../ItemInput';

configure({adapter: new Adapter()});

const mockItem = {
    id: 0,
    item: {
        content: "test content",
        rating: 6,
    }
};

// Snapshot test for ItemInput component
describe('Item Input ', () => {
    it('should render correctly ', () => {
        const component = shallow(<ItemInput onInput={(item) => (item)} />);
        expect(component).toMatchSnapshot();
    });

    it('should simulate and render item input correctly ', () => {
        const onInputMock = jest.fn();
        const component = shallow(<ItemInput onInput={onInputMock} />);
        component.setState({ content: "Test content", rating: 10 });
        const content = component.findWhere((comp) => comp.type() == 'input' && comp.props().type === 'text').props().value;
        const rating = component.findWhere((comp) => comp.type() == 'input' && comp.props().type === 'number').props().value;
        expect(content).toEqual('Test content');
        expect(rating).toEqual(10);

        const form = component.find('form')
        form.simulate('submit', {
            preventDefault: () => {
            }
        }); // second argument is empty event object which will get sent when form is submit in running simulation.
        expect(onInputMock).toBeCalledWith({content: "Test content",  rating: 10});
        component.unmount();
    });
});
