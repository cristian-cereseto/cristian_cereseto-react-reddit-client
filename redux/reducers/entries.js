import * as types from '../actions/types';

const initialState = {
    loadingEntries: false,
    entries: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING_ENTRIES:
            return {
                ...state,
                loadingEntries: action.loadingEntries
            };
        case types.SET_ENTRIES:
            return {
                ...state,
                entries: action.entries
            };
        case types.GET_ENTRIES_SUCCESS:
            return {
                ...state,
                loadingEntries: false
            };
        case types.GET_ENTRIES_ERROR:
            return {
                ...state,
                loadingEntries: false
            };
        default:
            return initialState;
    }
};
