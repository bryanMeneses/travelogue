import { SET_CURRENT_USER, SET_REGISTER_USER_LOADING, SET_SIGNIN_LOADING } from "../actions/types";
import isObjectEmpty from '../utilities/isObjectEmpty'

const initialState = {
    isAuthenticated: false,
    user: {},
    registerUserLoading: false,
    signinLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isObjectEmpty(action.payload),
                user: action.payload
            }
        case SET_REGISTER_USER_LOADING:
            return {
                ...state,
                registerUserLoading: action.payload
            }
        case SET_SIGNIN_LOADING:
            return {
                ...state,
                signinLoading: action.payload
            }
        default:
            return state
    }
}

