import { Types } from '../actions';

const defaultState = {
    items: [],
}

const todoReducer = (state = defaultState, action) => {
    console.log("action received: "+action.type);
    console.log(action);
    switch(action.type) {
        case Types.CREATE_ITEM: {
            let item = {id: state.items.length, item: action.payload};
            let newState = { items: state.items.slice() };
            newState.items.push(item)
            return newState;
        }

        case Types.UPDATE_RATING: {
            let idRatingMap = action.payload;
            let newState = { items: state.items.slice() }
            // newState.items.filter((newItem) => (
            //     newItem.id !== idRatingMap.id
            // ));
            // newState.items.push(item)
            newState.items.forEach((item) => {
                if (item.id === idRatingMap.itemID) {
                    item.rating = idRatingMap.rating
                }
            });
            return newState;
        }

        case Types.ADD_ITEMS: {
            let data = action.payload;
            let offset = state.items.length;
            let outData = []
            data.forEach(element => {
                let d = {};
                d['id'] = offset;
                d['item'] = element;
                outData.push(d);
                offset++;
            });
            let newState = { items: state.items.slice() };
            newState.items = newState.items.concat(outData);
            return newState
        }

        default:
            return state;
    }
};

export default todoReducer;
