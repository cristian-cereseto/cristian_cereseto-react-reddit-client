import * as types from '../actions/types';

const initialState = {
    loadingEntries: false
};

export const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING_ENTRIES:
            return {
                loadingEntries: action.loadingState
            };
        default:
            return initialState;
    }
};
