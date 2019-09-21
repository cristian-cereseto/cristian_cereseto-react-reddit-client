import {combineReducers} from 'redux';
import * as postsReducers from './posts';

export default combineReducers(Object.assign(postsReducers));
