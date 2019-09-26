import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NotFoundImage from '../../images/NotFoundImage'

export class NotFound extends Component {
    render() {
        const links = this.props.auth.isAuthenticated ? (
            <div className="home-link-box">
                <Link to="/dashboard">Leave Page</Link>
            </div>
        ) :
            (
                <div className="home-link-box">
                    <Link to="/">Leave Page</Link>
                </div>
            )
        return (
            <div className="not-found-page">
                <div className="animated fadeIn faster">
                    <h1>Oops!</h1>
                    <NotFoundImage />
                    <h2>Page Not Found</h2>
                    <h4>Sorry, this page does not exist</h4>
                    {links}
                </div>
            </div>
        )
    }
}

const MapStateToProps = state => ({
    auth: state.auth
})

export default connect(MapStateToProps, null)(NotFound)
