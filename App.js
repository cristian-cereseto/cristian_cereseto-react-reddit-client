import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './redux/reducers';
import {Provider} from 'react-redux';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});
const configureStore = (initialState) => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));

  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

export default function App() {
  return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Reddit Client</Text>
        </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
