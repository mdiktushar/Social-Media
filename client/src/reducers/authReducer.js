import { TEST_DISPATCH } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    hello: 'test'
};

// to avoid the worning using off defountly it was anonymous function
export default function foo(state = initialState, action) {
    switch (action.type) {
        
        case TEST_DISPATCH: 
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}
  