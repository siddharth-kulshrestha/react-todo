import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import TodoBody from '../TodoBody';
import store from '../../../store/store';
import { createItem } from '../../../actions'
import ItemInput from '../../ItemInput/ItemInput';
import Item from '../../Item/Item';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';


configure({adapter: new Adapter()});

const mockItem = {
    id: 0,
    item: {
        content: "test content",
        rating: 6,
    }
};

// TodoBody test suite testing actions with redux-mock-store
describe('TodoBody Test suite ', () => {
    const initialState = {
        items: []
    };
    const mockStore = configureStore();
    let store, component;

    beforeEach(() => {
        store = mockStore(initialState);
        component = mount( // componentDidMount() will not get trigger if we use shallow
        <Provider store={store}>
            <TodoBody />
        </Provider>
        );
    });

    it('check whether add multiple action call ', () => {
        const actions = store.getActions();
        expect(actions[0].type).toBe('ADD_ITEMS');
        expect(component).toMatchSnapshot();
    });

    it(' check whether add item action is getting called when an item is added ', () => {
        const itemInput = component.find(ItemInput);
        itemInput.setState({ content: "Test content", rating: 10 });
        
        const form = itemInput.find('form')
        form.simulate('submit', {
            preventDefault: () => {
            }
        });
        const actions = store.getActions();
        expect(actions[0].type).toBe('ADD_ITEMS');
        expect(actions[1].type).toBe('CREATE_ITEM');
        expect(actions[1].payload).toMatchObject({ content: "Test content", rating: 10 });
    });
});

// TodoBody test suite testing actions with actual store
describe('TodoBody Test suite ', () => {
    const initialState = {
        items: []
    };
    // const actualStore = store(initialState);
    let reduxStore, component;

    beforeEach(() => {
        // store = actualStore(initialState);
        reduxStore = store(initialState);
        component = mount( // componentDidMount() will not get trigger if we use shallow
        <Provider store={reduxStore}>
            <TodoBody />
        </Provider>
        );
    });

    it('test CREATE_ITEM action ', () => {
        reduxStore.dispatch(createItem({
            content: "test content",
            rating: 6,
        }));
        const storeState = reduxStore.getState();
        const lstIdx = storeState.items.length - 1;
        expect(storeState.items[lstIdx].item.content).toBe("test content");
        expect(storeState.items[lstIdx].item.rating).toBe(6);
    });

    it(' check whether add item action is getting called when an item is added ', () => {
        const itemInput = component.find(ItemInput);
        itemInput.setState({ content: "Test content 2 <unique>", rating: 10 });
        
        const form = itemInput.find('form')
        form.simulate('submit', {
            preventDefault: () => {
            }
        });

        // Verifying whether added item is added to store or not
        const storeState = reduxStore.getState();
        const lstIdx = storeState.items.length - 1;
        expect(storeState.items[lstIdx].item.content).toBe("Test content 2 <unique>");
        expect(storeState.items[lstIdx].item.rating).toBe(10);

        // Verifying added item in item-list
        const item = component.findWhere((comp) => comp.type() == Item &&
            comp.props().data && comp.props().data.item.content === 'Test content 2 <unique>'
            && comp.props().data.item.rating === 10);
        expect(item.length).toBe(1);
    });
});
