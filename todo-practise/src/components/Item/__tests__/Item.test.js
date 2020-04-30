import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item, { RateItem } from '../Item';
import { Button } from '../../Button/Button';

configure({adapter: new Adapter()});

const mockItem = {
    id: 0,
    item: {
        content: "test content",
        rating: 6,
    }
};

// Snapshot test for Item component
describe('Item ', () => {
    it('should render correctly ', () => {
        const component = shallow(<Item data={mockItem} />);
        expect(component).toMatchSnapshot();
    });

    // Not really needed covered in snapshot testing
    it('should render content of item correctly ', () => {
        const component = shallow(<Item data={mockItem} />);
        const text = component.find('h3').text();
        expect(text).toEqual('test content');
    });
});

// Testing Item with RateItem component
describe('Testing RateItem component with Item component ', () => {

    it('Checking if rate component rate value is rendered correctly ', () => {
        const component = mount(<Item data={mockItem} />);
        const text = component.find(RateItem).find('b').text(); // Here we are accessing RateItem component so mount() is necessary
        expect(text).toEqual(' 6 ');
        component.unmount();
    });
    
    
    it(' Testing change of rate increase in item ', () => {
        const onRatingChangeFunc = jest.fn();
        const component = mount(<Item data={mockItem} onRatingChange={onRatingChangeFunc} />);
        component.find(RateItem).findWhere((comp) => comp.type() == Button && comp.text() == '+').simulate('click');
        expect(onRatingChangeFunc).toBeCalledWith(0, 7);
        component.unmount();
    });

    it(' Testing change of rate decrease in item ', () => {
        const onRatingChangeFunc = jest.fn();
        const component = mount(<Item data={mockItem} onRatingChange={onRatingChangeFunc} />);
        component.find(RateItem).findWhere((comp) => comp.type() == Button && comp.text() == '-').simulate('click');
        expect(onRatingChangeFunc).toBeCalledWith(0, 5);
        component.unmount();
    });
});
