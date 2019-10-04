import { CREATE_POST, GET_POSTS, DELETE_POST, POSTS_LOADING, SET_CREATE_POST_LOADING } from "../actions/types"


const initialState = {
    posts: [],
    loading: false,
    createPostLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_CREATE_POST_LOADING:
            return {
                ...state,
                createPostLoading: action.payload
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(cur => cur._id !== action.payload)
            };
        default:
            return state
    }
}