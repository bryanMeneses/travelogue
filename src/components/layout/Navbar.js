import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeNavbarColor: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const changeNavbarColor = window.scrollY > 65
            if (changeNavbarColor !== this.state.changeNavbarColor) {
                this.setState({ changeNavbarColor })
            }
        })
    }

    logoutUser = e => {
        this.props.logoutUser(this.props.history)
    }

    render() {
        let links = this.props.auth.isAuthenticated ?
            (<React.Fragment>
                <Link className="custom-link" to="/feed">Feed</Link>
                <Link className="custom-link" to="/dashboard">Dashboard</Link>
                <Link className="custom-link" to="/edit-account">Account</Link>
                <span className="custom-link" style={{ cursor: 'pointer' }} onClick={this.logoutUser}>Log Out</span>
            </React.Fragment>)
            : (
                <React.Fragment>
                    <Link className="custom-link" to="/">Home</Link>
                    <Link className="custom-link" to="/signin">Sign in</Link>
                </React.Fragment>
            )
        return (
            <div>
                <Navbar variant="dark" fixed='top' expand="lg" className={`${this.state.changeNavbarColor ? ('transparent-navbar') : null}`}
                >
                    <Link className="custom-link" to="/">TraveLogue</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Link className="custom-link" to="/about">About</Link>
                        <Nav className="ml-auto">
                            {links}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));