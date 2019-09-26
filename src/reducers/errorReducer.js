import { GET_SIGNIN_ERRORS, GET_REGISTER_ERRORS, GET_PROFILE_REQUIRED_ERRORS, GET_PROFILE_OPTIONAL_INFO_ERRORS, GET_TRAVEL_PLAN_ERRORS, GET_LEARNING_LANGUAGE_ERRORS, GET_CREATE_POST_ERROR } from '../actions/types'

const initialState = {
    registerErrors: {},
    signinErrors: {},
    profileRequiredErrors: {},
    profileOptionalInfoErrors: [],
    travelPlanErrors: [],
    learningLanguageErrors: [],
    createPostErrors: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REGISTER_ERRORS:
            return {
                ...state,
                registerErrors: action.payload
            }
        case GET_SIGNIN_ERRORS:
            return {
                ...state,
                signinErrors: action.payload
            }
        case GET_PROFILE_REQUIRED_ERRORS:
            return {
                ...state,
                profileRequiredErrors: action.payload
            }
        case GET_PROFILE_OPTIONAL_INFO_ERRORS:
            return {
                ...state,
                profileOptionalInfoErrors: action.payload
            }
        case GET_TRAVEL_PLAN_ERRORS:
            return {
                ...state,
                travelPlanErrors: action.payload
            }
        case GET_LEARNING_LANGUAGE_ERRORS:
            return {
                ...state,
                learningLanguageErrors: action.payload
            }
        case GET_CREATE_POST_ERROR:
            return {
                ...state,
                createPostErrors: action.payload
            }
        default:
            return state
    }
}