import { SET_CURRENT_PROFILE, PROFILE_LOADING } from "../actions/types";
import isObjectEmpty from "../utilities/isObjectEmpty";

const initialState = {
    hasProfile: false,
    profile: {},
    loading: false
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
        default:
            return state
    }
}
