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
        case types.SET_NEXT_ENTRIES:
            const entries = state.entries.concat(action.newEntries);
            return {
                ...state,
                entries
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
        case types.REMOVE_ALL_ENTRIES:
            return initialState;
        case types.SET_ENTRY_AS_READ:
            const allEntries = [];
            const selectedEntry = state.entries.find(entry => entry.id === action.entryId);
            if (selectedEntry) {
                selectedEntry.isRead = true;
            }

            state.entries.map(entry => allEntries.push(entry));

            return {
                ...state,
                entries: allEntries
            };
        default:
            return initialState;
    }
};
