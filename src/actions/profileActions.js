import axios from 'axios'
import { SET_CURRENT_PROFILE, GET_PROFILE_REQUIRED_ERRORS, PROFILE_LOADING, GET_PROFILE_OPTIONAL_INFO_ERRORS, GET_TRAVEL_PLAN_ERRORS, GET_LEARNING_LANGUAGE_ERRORS } from './types';
import { logoutUser } from './authActions';

export const createNewProfile = (profileData, history) => (dispatch, getState) => {
    axios.post('https://travelogue-api.herokuapp.com/api/profile/required', profileData)
        .then(res => {

            // clear errors if any 
            if (getState().errors.profileRequiredErrors.length > 0) {
                dispatch(clearProfileRequiredErrors())
            }
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            })
            if (history) {
                history.push('/dashboard')
            }
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE_REQUIRED_ERRORS,
                payload: err.response.data
            })
        })
}

export const submitOptionalInfo = (info) => (dispatch, getState) => {
    axios.post('https://travelogue-api.herokuapp.com/api/profile/info', info)
        .then(res => {

            //  clear errors if any
            if (getState().errors.profileOptionalInfoErrors.length > 0) {
                dispatch(clearProfileOptionalInfoErrors())
            }
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE_OPTIONAL_INFO_ERRORS,
                payload: err.response.data
            })
        })
}

export const createTravelPlan = (travelPlan) => dispatch => {
    axios.post('https://travelogue-api.herokuapp.com/api/profile/info/travel_plans', travelPlan)
        .then(res => dispatch({
            type: SET_CURRENT_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_TRAVEL_PLAN_ERRORS,
            payload: err.response.data
        }))
}

export const editTravelPlan = (travelPlan, id) => (dispatch, getState) => {
    axios.put(`https://travelogue-api.herokuapp.com/api/profile/info/travel_plans/${id}`, travelPlan)
        .then(res => {
            //clear errors if any 
            if (getState().errors.travelPlanErrors.length > 0) {
                dispatch(clearTravelPlanErrors())
            }
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_TRAVEL_PLAN_ERRORS,
            payload: err.response.data
        }))
}

export const deleteTravelPlan = _id => dispatch => {
    axios.delete(`https://travelogue-api.herokuapp.com/api/profile/info/travel_plans/${_id}`)
        .then(res => dispatch({
            type: SET_CURRENT_PROFILE,
            payload: res.data
        }))
        .catch(err => console.log(err.response.data))
}

export const addLearningLanguage = language => (dispatch, getState) => {
    axios.post('https://travelogue-api.herokuapp.com/api/profile/info/learning_languages', language)
        .then(res => {

            // clear errors if any
            if (getState().errors.learningLanguageErrors.length > 0) {
                dispatch(clearLearningLanguageErrors())
            }
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_LEARNING_LANGUAGE_ERRORS,
            payload: err.response.data
        }))
}
export const deleteLearningLanguage = _id => dispatch => {
    axios.delete(`https://travelogue-api.herokuapp.com/api/profile/info/learning_languages/${_id}`)
        .then(res => dispatch({
            type: SET_CURRENT_PROFILE,
            payload: res.data
        }))
        .catch(err => console.log(err.response.data))
}

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('https://travelogue-api.herokuapp.com/api/profile')
        .then(res => dispatch(setCurrentProfile(res.data)))
        .catch(err => {
            dispatch(setCurrentProfile({}))
        })
}
export const getProfileByUsername = username => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`https://travelogue-api.herokuapp.com/api/profile/username/${username}`)
        .then(res => {
            dispatch(setCurrentProfile(res.data))
        })
        .catch(err => {
            dispatch(setCurrentProfile({}))
        })
}

export const deleteAccount = history => dispatch => {
    if (!window.confirm('Are you sure? All your information will be permanently deleted.')) return
    axios.delete('https://travelogue-api.herokuapp.com/api/profile/')
        .then(res => {
            dispatch(logoutUser(history))
        })
        .catch(err => console.log(err.response.data))
}

export const setCurrentProfile = profileData => {
    return {
        type: SET_CURRENT_PROFILE,
        payload: profileData
    }
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearTravelPlanErrors = () => {
    return {
        type: GET_TRAVEL_PLAN_ERRORS,
        payload: []
    }
}

export const clearProfileRequiredErrors = () => {
    return {
        type: GET_PROFILE_REQUIRED_ERRORS,
        payload: []
    }
}

export const clearProfileOptionalInfoErrors = () => {
    return {
        type: GET_PROFILE_OPTIONAL_INFO_ERRORS,
        payload: []
    }
}

export const clearLearningLanguageErrors = () => {
    return {
        type: GET_LEARNING_LANGUAGE_ERRORS,
        payload: []
    }
}