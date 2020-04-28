import { createStore } from 'redux';
import todoReducer from '../reducers';

export default function store(initialState) {
    const store = createStore(todoReducer, initialState);
    return store; 
};
