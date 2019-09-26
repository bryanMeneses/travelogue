import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardItem from './CardItem';
import CardItem2 from './CardItem2';
import CardItem3 from './CardItem3';
import CardItem4 from './CardItem4';
import { getCurrentProfile } from '../../actions/profileActions';
import { createPost, getPosts, deletePost, likePost, unlikePost } from '../../actions/postActions';
import PostItem from './PostItem';
import LoadingSpinner from '../layout/LoadingSpinner';

class PostFeed extends Component {
    state = {
        hideCards: false,
        text: '',
        comment: ''
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.profile.loading && !nextProps.profile.hasProfile) {
            this.props.history.push('/create-profile')
        }
    }

    componentDidMount() {
        this.props.getCurrentProfile()

        // get all posts
        this.props.getPosts();
    }
    hideCards = e => {
        const cardsContainer = document.getElementById('cards-container')
        if (this.state.hideCards) {
            this.setState({ hideCards: !this.state.hideCards })
            cardsContainer.classList.toggle('d-none')
            cardsContainer.classList.toggle('fadeOut')
            cardsContainer.classList.toggle('fadeIn')
        }
        if (!this.state.hideCards) {
            this.setState({ hideCards: !this.state.hideCards })
            cardsContainer.classList.toggle('fadeIn');
            cardsContainer.classList.toggle('fadeOut');
            setTimeout(() => {
                cardsContainer.classList.toggle('d-none');
            }, 800);
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createPost = (text, e) => {
        e.preventDefault();

        let post = {}

        if (text) {
            post = {
                text
            };
            this.hideCards();
        } else if (!text) {
            post = {
                text: this.state.text,
            }
        }

        this.props.createPost(post)

        this.setState({ text: '' })

    }

    deletePost = id => {
        if (!window.confirm("Are you sure you want to delete this post?")) return
        this.props.deletePost(id)
    }

    likePost = id => {
        this.props.likePost(id)
    }

    unlikePost = id => {
        this.props.unlikePost(id)
    }


    render() {
        const { profile, loading } = this.props.profile
        const { posts } = this.props.post

        let { name } = this.props.auth.user;
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
        name = name[0]

        let hideCardText = this.state.hideCards ? "Show" : "Hide"

        if (profile === null || loading) {
            return <LoadingSpinner />
        } else {
            return (
                <div className="posts-feed-container">
                    <div className="primary-container">
                        <section className="info-container">
                            <h5>Hello, {name}. You can make a post this page.</h5>
                            <p className="text-muted">
                                Ask questions about any travels you have coming up, or simply say "Hello!".
                            </p>
                            <p className="text-muted">
                                You can also click on one of the cards below to make a post automatically!
                            <span onClick={this.hideCards} style={{ cursor: "pointer" }} className="ml-2 text-primary">{hideCardText}</span>
                            </p>
                        </section>
                        <section id="cards-container" className={`post-question-container animated fadeIn`}>
                            <CardItem createPost={this.createPost} />
                            <CardItem2 createPost={this.createPost} />
                            <CardItem3 createPost={this.createPost} />
                            <CardItem4 createPost={this.createPost} />
                        </section>
                        <section className="create-post-container">
                            <form onSubmit={this.createPost.bind(null, null)}>
                                <label className="d-inline-block font-weight-bold" htmlFor="text"><i className="fas fa-edit"></i>{" "}Create post:</label> <span className="text-muted">-at least 2 characters long</span>
                                <textarea
                                    required
                                    id="text"
                                    className="bg-white  edit-profile-textarea mb-3"
                                    placeholder="What is on your mind?"
                                    onChange={this.onChange}
                                    value={this.state.text}
                                    name='text'
                                ></textarea>
                                <div style={{ width: '40%', marginLeft: 'auto', maxWidth: '215px' }}>
                                    <button className="w-100 create-post-button">Post</button>
                                </div>
                            </form>
                        </section>
                        <section className="posts-container animated fadeIn">
                            {posts && posts.length > 0 ? posts.map((post, i) => <PostItem
                                post={post}
                                key={i}
                                userId={this.props.auth.user._id}
                                deletePost={this.deletePost}
                                likePost={this.likePost}
                                unlikePost={this.unlikePost}
                            />) : (
                                    <div>
                                        <h2 className="d-inline">Oops...</h2> there is nothing to show yet.
                                </div>
                                )}
                        </section>
                    </div>
                </div >
            )
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors,
    post: state.post
})

export default connect(mapStateToProps, { getCurrentProfile, createPost, getPosts, deletePost, likePost, unlikePost })(PostFeed)
