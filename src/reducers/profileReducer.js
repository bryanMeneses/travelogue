import { SET_CURRENT_PROFILE, PROFILE_LOADING, SET_EDIT_PROFILE_LOADING, SET_ADD_LANGUAGE_LOADING, SET_PROFILE_REQUIRED_LOADING } from "../actions/types";
import isObjectEmpty from "../utilities/isObjectEmpty";

const initialState = {
    hasProfile: false,
    profile: {},
    loading: false,
    editProfileLoading: false,
    addLanguageLoading: false,
    profileRequiredLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                hasProfile: !isObjectEmpty(action.payload),
                profile: action.payload,
                loading: false
            };
        case SET_EDIT_PROFILE_LOADING:
            return {
                ...state,
                editProfileLoading: action.payload
            }
        case SET_ADD_LANGUAGE_LOADING:
            return {
                ...state,
                addLanguageLoading: action.payload
            }
        case SET_PROFILE_REQUIRED_LOADING:
            return {
                ...state,
                profileRequiredLoading: action.payload
            }
        default:
            return state
    }
}
