import {combineReducers} from 'redux';
import * as postsReducers from './entries';

export default combineReducers(Object.assign(postsReducers));
