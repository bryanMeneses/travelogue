import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export class About extends Component {
    render() {
        const links = this.props.auth.isAuthenticated ? (<div className="home-link-box"><Link to="/dashboard">Leave Page</Link></div>) :
            (<div className="home-link-box"><Link to="/">Leave Page</Link></div>)
        return (
            <div className="about-page">
                <div className="animated fadeIn faster">
                    <h1>TraveLogue</h1>
                    <h2>Version 1.0.0</h2>
                    <h5>I created this website to demonstrate my capabilities in full-stack application functionalities, using MongoDB (Mongoose) and Express on the back-end, and React and Redux for state management.</h5>
                    {links}
                </div>
            </div>
        )
    }
}

const MapStateToProps = state => ({
    auth: state.auth
})

export default connect(MapStateToProps, null)(About)
