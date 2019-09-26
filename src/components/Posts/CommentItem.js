import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/postActions'

class CommentItem extends Component {
    deleteComment(props) {
        if (!window.confirm("Are you sure you want to delete this comment?")) return
        const { comment, postId } = props
        this.props.deleteComment(comment._id, postId)
    }

    render() {
        const { comment, userId } = this.props

        let { text, name, username } = comment

        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ');

        const showDeleteComment = comment.user === userId ? (
            <span onClick={this.deleteComment.bind(this, this.props)} style={{ cursor: 'pointer' }} className="float-right"><i className="fas fa-times"></i></span>
        ) : null

        return (
            <div className="comment-item">
                <p>
                    <span className="comment-name">
                        <a target="blank" href={`//localhost:3000/user/${username}`}>
                            {name}
                        </a >
                        {" "}
                    </span>
                    {text}
                    {showDeleteComment}
                </p>
            </div>
        )
    }
}
export default connect(null, { deleteComment })(CommentItem)