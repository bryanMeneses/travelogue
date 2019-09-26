import axios from 'axios'
import { CREATE_POST, GET_CREATE_POST_ERROR, GET_POSTS, DELETE_POST, POSTS_LOADING } from './types'

export const createPost = post => (dispatch, getState) => {
    axios.post('https://travelogue-api.herokuapp.com/api/post', post)
        .then(res => {
            // clear errors if any using getState()
            if (Object.keys(getState().errors.createPostErrors).length > 0) {
                dispatch({
                    type: GET_CREATE_POST_ERROR,
                    payload: {}
                })
            }
            dispatch({
                type: CREATE_POST,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_CREATE_POST_ERROR,
            payload: err.response.data
        }))
}

export const getPosts = () => dispatch => {
    axios.get('https://travelogue-api.herokuapp.com/api/post/all')
        .then(res => {
            dispatch(setPostsLoading())
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}

export const deletePost = _id => dispatch => {
    axios.delete(`https://travelogue-api.herokuapp.com/api/post/${_id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: _id
        }))
        .catch(err => console.log(err.response.data))
}

export const likePost = _id => dispatch => {
    axios.post(`https://travelogue-api.herokuapp.com/api/post/like/${_id}`)
        .then(res => {
            dispatch(getPosts())
        })
        .catch(err => console.log(err.response.data))
}
export const unlikePost = _id => dispatch => {
    axios.delete(`https://travelogue-api.herokuapp.com/api/post/unlike/${_id}`)
        .then(res => {
            dispatch(getPosts())
        })
        .catch(err => console.log(err.response.data))
}

export const commentPost = (_id, comment) => dispatch => {
    axios.post(`https://travelogue-api.herokuapp.com/api/post/comment/${_id}`, comment)
        .then(res => {
            dispatch(getPosts())
        })
        .catch(err => console.log(err))
}
export const deleteComment = (commentId, postId) => dispatch => {
    axios.delete(`https://travelogue-api.herokuapp.com/api/post/comment/${postId}/${commentId}`)
        .then(res => {
            dispatch(getPosts())
        })
        .catch(err => console.log(err))
}

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
}