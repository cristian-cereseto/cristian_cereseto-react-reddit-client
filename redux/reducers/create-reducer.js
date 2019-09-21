// helper function to avoid creating reducers with a switch/case
const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
};

export default createReducer;
