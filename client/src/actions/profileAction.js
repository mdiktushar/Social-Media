import axios from 'axios'

import {PROFILE_LOADING, GET_PROFILE, CLEAR_CUTTER_PROFILE } from './types'
// import {GET_ERRORS} from './types'

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(stateProfileLoading())
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

// Profile loading
export const stateProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear loading
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CUTTER_PROFILE
    }
}