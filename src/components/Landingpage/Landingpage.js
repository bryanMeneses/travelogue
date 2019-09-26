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
            errors: {}
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors.register_error) {
            this.setState({ errors: nextProps.errors })
        }
    }
    componentWillUnmount() {
        if (Object.keys(this.props.errors).length > 0) {
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
        const { errors } = this.state



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
                                    {/* If error return an h6 heading displaying the error message */}
                                    {errors ? (<h6 className="text-danger text-center small-font">{errors.register_error}</h6>) : null}
                                    <TextInputPlusLabel
                                        className='w-100 mb-3 custom-text-input'
                                        id='name'
                                        type='text'
                                        name='name'
                                        label='Name:'
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        placeholder="Name"
                                    />
                                    <TextInputPlusLabel
                                        className='w-100 mb-3 custom-text-input'
                                        id='email'
                                        type='email'
                                        name='email'
                                        label='Email:'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        placeholder="Email"
                                    />
                                    <TextInputPlusLabel
                                        className='w-100 mb-3 custom-text-input'
                                        id='password'
                                        type='password'
                                        name='password'
                                        label='Password:'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        placeholder="Password"
                                    />
                                    <TextInputPlusLabel
                                        className='w-100 mb-3 custom-text-input'
                                        id='confirmpw'
                                        type='password'
                                        name='confirmpw'
                                        label='Confirm your password:'
                                        value={this.state.confirmpw}
                                        onChange={this.onChange}
                                        placeholder="Confirm password"
                                    />
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