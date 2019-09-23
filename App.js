import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import  { reducer } from './redux/reducers/entries';
import {Provider} from 'react-redux';
import FeedContainer from './containers/FeedContainer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EntryDetails from "./components/EntryDetails";

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});
const configureStore = (initialState) => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));

  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

const AppNavigator = createStackNavigator({
    Feed: FeedContainer,
    EntryDetails: EntryDetails
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
  );
}

