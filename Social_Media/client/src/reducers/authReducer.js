import isEmpty from '../validation/isEmpty';

import { SET_CURRENT_USER } from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {},
    hello: 'test'
};

// to avoid the worning using off defountly it was anonymous function
export default function foo(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload

            }
        default:
            return state;
    }
}
  