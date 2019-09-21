import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import  { reducer } from './redux/reducers/entries';
import {Provider} from 'react-redux';
import AppContainer from "./containers/AppContainer";

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});
const configureStore = (initialState) => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));

  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

export default function App() {
  return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
  );
}

