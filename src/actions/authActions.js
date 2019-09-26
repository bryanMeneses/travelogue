import axios from 'axios'
import { GET_REGISTER_ERRORS, GET_SIGNIN_ERRORS, SET_CURRENT_USER } from './types';
import setTokenToAuthHeader from '../utilities/setTokenToAuthHeader';
import jwt_decode from 'jwt-decode'
import { setCurrentProfile } from './profileActions';

export const registerUser = (userData, history) => (dispatch, getState) => {
    axios.post('https://travelogue-api.herokuapp.com/api/users/register', userData)
        .then(res => {
            // Remove errors if any
            if (getState().errors.registerErrors.length > 0) {
                dispatch(clearRegisterErrors())
            }
            history.push('/signin')
        })
        .catch(err => {
            dispatch({
                type: GET_REGISTER_ERRORS,
                payload: err.response.data
            })
        })
}

export const loginUser = (userData, history) => (dispatch, getState) => {
    axios.post('https://travelogue-api.herokuapp.com/api/users/login', userData)
        .then(res => {
            // Remove errors if any
            if (getState().errors.signinErrors.length > 0) {
                dispatch(clearSigninErrors())
            }
            // Get token from res.data
            const { token } = res.data
            // Set token to local storage
            localStorage.setItem('jwtToken', token)
            // Set Token to Authorization Header 
            setTokenToAuthHeader(token)
            // Decode token (this contains the information about the user)
            const decodedToken = jwt_decode(token)
            // Set the current user with decodedToken
            dispatch(setCurrentUser(decodedToken))
            // dispatch(setProfileLoading())
            // Push to dashboard
            history.push('/dashboard')
        })
        .catch(err => {
            console.log(err.message)
            dispatch({
                type: GET_SIGNIN_ERRORS,
                payload: err.response.data
            })

        })
}

export const logoutUser = history => dispatch => {
    // Delete token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove token from auth header
    setTokenToAuthHeader(false)
    // Remove current user / Set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}))
    dispatch(setCurrentProfile({}))
    // Reroute to "/" which is the register page
    if (history) {
        history.push('/')
    }
}

export const setCurrentUser = decodedToken => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedToken
    }
}

export const clearRegisterErrors = () => {
    return {
        type: GET_REGISTER_ERRORS,
        payload: []
    }
}

export const clearSigninErrors = () => {
    return {
        type: GET_SIGNIN_ERRORS,
        payload: []
    }
}