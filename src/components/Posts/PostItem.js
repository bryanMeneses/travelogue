import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MaleAvatar from '../../images/MaleAvatar';
import FemaleAvatar from '../../images/FemaleAvatar';
import formatDate from '../../utilities/formatDate';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommentContainer: false
        }
    }

    showCommentContainer = e => {
        this.setState({ showCommentContainer: !this.state.showCommentContainer })
    }

    render() {
        const { post, userId, deletePost, likePost, unlikePost } = this.props
        let { name, date } = post;

        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ');

        date = formatDate(date) === 'Today' ?
            (<span>
                Posted Today
            </span>) :
            (<span>
                Posted on <br /> {formatDate(date)}
            </span>)

        // show delete post only if its ur post
        const showDeletePost = userId === post.user ? (<div onClick={deletePost.bind(null, post._id)} style={{ cursor: 'pointer' }} className="delete-post float-right">
            <i className="fas fa-trash text-danger"></i>
        </div>) : null

        // show red heart and unlike onClick if liked or show gray heart and like onClick if not liked
        const showLike = post.likes.filter(cur => cur.user === userId).length > 0 ?
            (
                <div onClick={unlikePost.bind(null, post._id)} className="post-like d-inline-block">
                    <i
                        className='fas fa-heart'></i> {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                </div>) :
            (<div onClick={likePost.bind(null, post._id)} className="post-dislike d-inline-block">
                <i
                    className='fas fa-heart'></i> {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
            </div>)

        const showCommentContainer = this.state.showCommentContainer ?
            (<React.Fragment>
                <CommentForm postId={post._id} />
                {post.comments.map((cur, i) => <CommentItem key={i} comment={cur} userId={userId} postId={post._id} />)}
            </React.Fragment>
            ) : null

        const userCommented = post.comments.filter(cur => cur.user === userId).length > 0 ?
            'user-commented' : null

        return (
            <article className="post-item-container animated fadeIn">
                <header style={{ position: 'relative' }}>
                    {post.gender === 'Male' ? <MaleAvatar /> : <FemaleAvatar />}
                    <div className="ml-2 d-inline-block align-middle">
                        <h5 style={{ letterSpacing: '.25px', marginBottom: '1.5px' }} >{name}</h5>
                        <p>
                            <Link className="username-link" target="blank" to={`/user/${post.username}`}>
                                @{post.username}
                            </Link >
                        </p >
                    </div >
                    <div className="post-date text-right">
                        {date}
                    </div>
                </header >
                <main className="post-text">
                    {post.text}
                </main>
                <footer>
                    {showLike}
                    <div onClick={this.showCommentContainer} className={`post-comments d-inline-block ml-3 ${userCommented}`}>
                        <i className="fas fa-comment"></i> {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                    </div>
                    {showDeletePost}
                    {showCommentContainer}
                </footer>
            </article >
        )
    }
}

export default PostItem
