import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
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
    redirectSpanElement = path => {
        this.props.history.push(path)
    }

    render() {
        let links = this.props.auth.isAuthenticated ?
            (<React.Fragment>
                <Nav.Link className="custom-link" eventKey={2} >
                    <span onClick={() => this.props.history.push("/feed")}>Feed</span>
                </Nav.Link>
                <Nav.Link className="custom-link" eventKey={2}>
                    <span onClick={() => this.props.history.push("/dashboard")}>Dashboard</span>
                </Nav.Link>
                <Nav.Link className="custom-link" eventKey={2}>
                    <span onClick={() => this.props.history.push("/edit-account")}>Account</span>
                </Nav.Link>
                <Nav.Link className="custom-link" eventKey={2}>
                    <span style={{ cursor: 'pointer' }} onClick={this.logoutUser}>Log Out</span>
                </Nav.Link>
            </React.Fragment>)
            : (
                <React.Fragment>
                    <Nav.Link className="custom-link" eventKey={2}>
                        <span onClick={() => this.props.history.push("/")}>Home</span>
                    </Nav.Link>
                    <Nav.Link className="custom-link" eventKey={2}>
                        <span onClick={() => this.props.history.push("/signin")}>Sign in</span>
                    </Nav.Link>
                </React.Fragment>
            )
        return (
            <div>
                <Navbar collapseOnSelect variant="dark" fixed='top' expand="lg" className={`${this.state.changeNavbarColor ? ('transparent-navbar') : null}`}
                >
                    <Navbar.Brand className="custom-link">
                        <span onClick={() => this.props.history.push('/')}>TraveLogue</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link className="custom-link" eventKey={2}>
                            <span onClick={() => this.props.history.push("/about")}>About</span>
                        </Nav.Link>
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