import todoReducer from './index';

describe('testing todo reducer', () => {
    it(' CREATE_ITEM ', () => {
        const state = { items: [
            {
                id: 0,
                item: {
                    content: "Test 0",
                    rating: 10
                }
            }
        ]};
        const action = {
            type: "CREATE_ITEM",
            payload: {
                content: "Test 1",
                rating: 5
            }
        }
        const newState = todoReducer(state, action);
        console.log(newState);
        const lastIdx = newState.items.length - 1;
        expect(newState.items[lastIdx]).toEqual({
            id: 1,
            item: {
                content: "Test 1",
                rating: 5
            }
        });
    });
});
