import React, { Component } from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { registerUser, clearRegisterErrors } from '../../actions/authActions';
import { connect } from 'react-redux'

// Components
import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel'


class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmpw: '',
        }
    }
    componentWillUnmount() {
        if (this.props.errors.length > 0) {
            this.props.clearRegisterErrors()
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password, confirmpw } = this.state

        const newUser = {
            name,
            email,
            password,
            confirmpw
        }

        this.props.registerUser(newUser, this.props.history)
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }


    render() {
        const userAlreadyExists = this.props.errors.filter(cur => cur.input_error.includes('user already exists'))
        const passwordsDontMatch = this.props.errors.filter(cur => cur.input_error.includes('Passwords do not match'))
        const errorIncludesName = this.props.errors.filter(cur => cur.input_error.includes('name'))
        const errorIncludesEmail = this.props.errors.filter(cur => cur.input_error.includes('email'))
        const errorIncludesPassword = this.props.errors.filter(cur => cur.input_error.includes('password'))
        const errorIncludesConfirmpw = this.props.errors.filter(cur => cur.input_error.includes('confirmpw'))


        return (
            <div className="landing_inner animated fadeIn">
                <Row className="justify-content-center">
                    <Col xs="12" lg="5" className="secondary-box align-self-center text-white mb-4">
                        <h1 style={{ fontSize: '3rem' }} className="mb-4 font-weight-bold">Tired of traveling like a tourist?</h1>
                        <h3 className="mb-4">So are we.</h3>
                        <h6 className="font-weight-light mb-5" style={{ lineHeight: "1.75em" }}>With TraveLogue, easily ask locals what to do where you're going, find locals with similar interests as yours, and make connections. Join today!</h6>
                        <Link to='/about' className="btn-custom">Learn more</Link>
                    </Col>
                    <Col xs="12" lg="7" className="primary-box">
                        <Card className="register-container input-font-color">
                            <Card.Body>
                                <h3 className="text-center font-weight-bold mb-4">Sign up for free today!</h3>
                                <form onSubmit={this.onSubmit}>
                                    {/* If error for "user already exists" occurs, return an h6 heading displaying the error message */}
                                    {userAlreadyExists.length > 0 ? (<h6 className="text-danger text-center small-font">{userAlreadyExists[0].input_error}</h6>) : null}
                                    {/* If error for passwords not matching occurs, return an h6 heading displaying the error message. */}
                                    {passwordsDontMatch.length > 0 ? (<h6 className="text-danger text-center small-font">{passwordsDontMatch[0].input_error}</h6>) : null}
                                    {/*  className is in template strings to allow conditional ternary operators to return 'invalid-input' class if there is an error. This will highlight the inputs red. */}
                                    <TextInputPlusLabel
                                        className={`w-100 mb-3 custom-text-input ${errorIncludesName.length > 0 ? ('invalid-input') : null}`}
                                        id='name'
                                        type='text'
                                        name='name'
                                        label='Name:'
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        placeholder="Name"
                                    />
                                    {/* If errors, display under the inputs */}
                                    {errorIncludesName.length > 0 ? (<h6 className="text-danger small-font">*{errorIncludesName[0].input_error.replace('"name"', '')}</h6>) : null}
                                    <TextInputPlusLabel
                                        className={`w-100 mb-3 custom-text-input ${errorIncludesEmail.length > 0 ? ('invalid-input') : null}`}
                                        id='email'
                                        type='email'
                                        name='email'
                                        label='Email:'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        placeholder="Email"
                                    />
                                    {errorIncludesEmail.length > 0 ? (<h6 className="text-danger small-font">*{errorIncludesEmail[0].input_error.replace('"email"', '')}</h6>) : null}
                                    <TextInputPlusLabel
                                        className={`w-100 mb-3 custom-text-input ${errorIncludesPassword.length > 0 ? ('invalid-input') : null}`}
                                        id='password'
                                        type='password'
                                        name='password'
                                        label='Password:'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        placeholder="Password"
                                    />
                                    {errorIncludesPassword.length > 0 ? (<h6 className="text-danger small-font">*{errorIncludesPassword[0].input_error.replace('"password"', '')}</h6>) : null}
                                    <TextInputPlusLabel
                                        className={`w-100 mb-3 custom-text-input ${errorIncludesConfirmpw.length > 0 ? ('invalid-input') : null}`}
                                        id='confirmpw'
                                        type='password'
                                        name='confirmpw'
                                        label='Confirm your password:'
                                        value={this.state.confirmpw}
                                        onChange={this.onChange}
                                        placeholder="Confirm password"
                                    />
                                    {errorIncludesConfirmpw.length > 0 ? (<h6 className="text-danger small-font">*{errorIncludesConfirmpw[0].input_error.replace('"confirmpw"', '')}</h6>) : null}
                                    <span><Link to="/signin">Already joined?</Link></span>
                                    <button
                                        className="mt-2 w-50 d-block btn-custom float-right"
                                        type="submit"
                                    >Sign Up!</button>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors.registerErrors,
    auth: state.auth
})

export default connect(mapStateToProps, { registerUser, clearRegisterErrors })(withRouter(Landingpage));