import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser, clearSigninErrors } from '../../actions/authActions';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors.signin_error) {
            this.setState({ errors: nextProps.errors })
        }
    }
    componentWillUnmount() {
        if (Object.keys(this.props.errors).length > 0) {
            this.props.clearSigninErrors()
        }
    }
    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state

        const user = {
            email,
            password
        }

        this.props.loginUser(user, this.props.history)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        const { errors } = this.state

        const { signinLoading } = this.props.auth;

        const signinMessage = signinLoading ?
            (
                <React.Fragment>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {" "}Loading...
                </React.Fragment>
            ) :
            (
                <React.Fragment>
                    Sign In
                </React.Fragment>
            )

        return (
            <div className="common-form-container animated fadeIn">
                <Row className="justify-content-center text-white">
                    <Col className="mt-5" xs="12" md="6">
                        <h3 className="text-center font-weight-bold mb-4">Login</h3>
                        <form onSubmit={this.onSubmit}>
                            {/* If error return an h6 heading displaying the error message */}
                            {errors ? (<h6 className="text-danger text-center small-font">{errors.signin_error}</h6>) : null}
                            <div className="form-icon mb-3">
                                <span className="form-icon far fa-envelope"></span>
                                <TextInputPlusLabel
                                    className='w-100 text-white profile-text-input'
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    label='Email:'
                                />
                            </div>
                            <div className="form-icon mb-3">
                                <span className="form-icon fas fa-lock"></span>
                                <TextInputPlusLabel
                                    className='w-100 mb-3 text-white profile-text-input'
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    label='Password:'
                                />
                            </div>
                            <div className="w-75 m-auto">
                                <button
                                    className="mt-2 w-100 btn-custom"
                                    type="submit"
                                >
                                    {signinMessage}
                                </button>
                            </div>
                        </form>
                    </Col>
                    <Col className="text-right hide-this" style={{ zIndex: '1' }} xs="12" md="6">
                        <div style={{ marginTop: "7em" }}>
                            <h1 className="display-4" style={{ fontStyle: 'italic' }}>TraveLogue</h1>
                            <h5 className="mt-4">Find a better way to travel.</h5>
                            <h6 className="mt-4 w-75 ml-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec augue ultrices porttitor.</h6>
                        </div>

                    </Col>
                </Row>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors.signinErrors,
    profile: state.profile
})

export default connect(mapStateToProps, { loginUser, clearSigninErrors })(withRouter(Signin));