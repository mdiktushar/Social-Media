import { GET_PROFILE } from "../actions/types"
import { PROFILE_LOADING, CLEAR_CUTTER_PROFILE } from "../actions/types"

const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function foo(state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING: 
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CLEAR_CUTTER_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}