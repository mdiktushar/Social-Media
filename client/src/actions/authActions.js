import axios from 'axios'
import setAuthToken from '../util/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from "./types"

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Login - GET user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to local Storage
            const { token } = res.data
            // Set token to local Storage ( only store string)
            localStorage.setItem('jwtToken', token)

            // Set token to Auth header
            setAuthToken(token)

            // Decode token to get user data
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(SetCurrentUser(decoded))

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set logged in user
export const SetCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}