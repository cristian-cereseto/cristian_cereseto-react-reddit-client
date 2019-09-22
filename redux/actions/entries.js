import * as types from './types.js';
import RedditAPI from '../../api/api';

export const setLoadingEntries = (loadingEntries) => ({ type: types.SET_LOADING_ENTRIES, loadingEntries });

export const getEntries = () => {
    return (dispatch, getState) => {
        dispatch(setLoadingEntries(true));
        RedditAPI.getFeed('/top').then(response => {
            const entries = [];
            if (response.data) {
                response.data.children.map(entry => entries.push(entry.data));
            }
            dispatch(getEntriesSuccess());
            dispatch(setEntries(entries));
        }).catch(error => {
            dispatch(getEntriesFailed());
            console.log(error);
        });
    }
};

export const getEntriesFailed = () => ({ type: types.GET_ENTRIES_ERROR });

export const getEntriesSuccess = () => ({ type: types.GET_ENTRIES_SUCCESS });

export const setEntries = (entries) => ({ type: types.SET_ENTRIES, entries });
