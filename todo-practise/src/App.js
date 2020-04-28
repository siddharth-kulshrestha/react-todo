import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import TodoBody from './components/TodoBody/TodoBody';
import store from './store/store';
import { Provider } from 'react-redux'; 

const reduxStore = store({ items: [] })

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Header title="TODO List Application"/>
        <TodoBody />
      </div>
    </Provider>
  );
}

export default App;
