import { SET_CURRENT_USER } from "../actions/types";
import isObjectEmpty from '../utilities/isObjectEmpty'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isObjectEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}

