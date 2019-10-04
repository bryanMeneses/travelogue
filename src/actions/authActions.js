import axios from 'axios'
import { GET_REGISTER_ERRORS, GET_SIGNIN_ERRORS, SET_CURRENT_USER, SET_REGISTER_USER_LOADING, SET_SIGNIN_LOADING } from './types';
import setTokenToAuthHeader from '../utilities/setTokenToAuthHeader';
import jwt_decode from 'jwt-decode'
import { setCurrentProfile } from './profileActions';

export const registerUser = (userData, history) => (dispatch, getState) => {
    dispatch(setRegisterUserLoading(true))
    axios.post('https://travelogue-api.herokuapp.com/api/users/register', userData)
        .then(res => {
            dispatch(setRegisterUserLoading(false))
            // Remove errors if any
            if (getState().errors.registerErrors.length > 0) {
                dispatch(clearRegisterErrors())
            }
            history.push('/signin')
        })
        .catch(err => {
            dispatch(setRegisterUserLoading(false))
            if (err.response && err.response.data) {
                dispatch({
                    type: GET_REGISTER_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: GET_REGISTER_ERRORS,
                    payload: err.message
                })
            }
        })
}

export const loginUser = (userData, history) => (dispatch, getState) => {
    dispatch(setSigninLoading(true));
    axios.post('https://travelogue-api.herokuapp.com/api/users/login', userData)
        .then(res => {
            dispatch(setSigninLoading(false))
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
            dispatch(setSigninLoading(false))
            if (err.response && err.response.data) {
                dispatch({
                    type: GET_SIGNIN_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: GET_SIGNIN_ERRORS,
                    payload: err.message
                })
            }


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

export const setRegisterUserLoading = isLoading => {
    return {
        type: SET_REGISTER_USER_LOADING,
        payload: isLoading
    }
}
export const setSigninLoading = isLoading => {
    return {
        type: SET_SIGNIN_LOADING,
        payload: isLoading
    }
}