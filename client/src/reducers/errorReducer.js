import { GET_ERRORS } from "../actions/types";

const initialState = {};

// to avoid the worning using off defountly it was anonymous function
export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        default:
            return state;
    }
}
  