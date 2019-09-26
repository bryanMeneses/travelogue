import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentPost } from '../../actions/postActions';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    postComment = e => {
        e.preventDefault();

        const { postId } = this.props

        const comment = {
            text: this.state.text
        }

        this.props.commentPost(postId, comment)

        this.setState({ text: '' })
    }
    render() {
        return (
            <form onSubmit={this.postComment}>
                <div className="add-comment">
                    <input
                        required
                        type="text"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        placeholder="Write a comment under 300 characters" />
                    <button className="add-comment-button"><i className="far fa-paper-plane"></i></button>
                </div>
            </form>
        )
    }
}

export default connect(null, { commentPost })(CommentForm)
