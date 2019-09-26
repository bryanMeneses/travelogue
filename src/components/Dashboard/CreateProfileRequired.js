import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel';
import { Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { createNewProfile, getCurrentProfile } from '../../actions/profileActions';

class CreateProfileRequired extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            gender: '',
            birth_date: '',
            current_location: '',
        }
    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.profile.hasProfile) {
            this.props.history.push('/dashboard')
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const { username, gender, birth_date, current_location } = this.state

        const newProfile = {
            username,
            gender,
            birth_date,
            current_location
        }

        this.props.createNewProfile(newProfile, this.props.history)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const usernameError = this.props.errors.filter(cur => cur.profile_required_error.includes('username'))
        const genderError = this.props.errors.filter(cur => cur.profile_required_error.includes('gender'))
        const birthdateError = this.props.errors.filter(cur => cur.profile_required_error.includes('birth_date'))
        const currentlocationError = this.props.errors.filter(cur => cur.profile_required_error.includes('current_location'))

        let { name } = this.props.auth.user

        // This returns the user.name with capital letters as expected
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ')

        return (
            <div className="common-form-container text-white animated fadeIn">
                <Row>
                    <Col md="6">
                        <h1>Hello, {name}</h1>
                        <h2>Let's get started</h2>
                        <p>First tell us a few things about yourself...</p>
                        <hr className="hr-form" />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-icon w-75 mb-3">
                                <span className="form-icon fas fa-user"></span>
                                <TextInputPlusLabel
                                    id='username'
                                    type='text'
                                    label='Unique username'
                                    name='username'
                                    value={this.state.username}
                                    placeholder='Username'
                                    className={`w-100 text-white profile-text-input ${usernameError.length > 0 ? ('invalid-input') : null} `}
                                    onChange={this.onChange}
                                />
                            </div>
                            {usernameError.length > 0 ? (<h6 className="text-danger small-font">{usernameError[0].profile_required_error}</h6>) : null}
                            {<p className="small-font">https://www.travelogue/com/{this.state.username}</p>}
                            <div>
                                <div className="form-icon w-75 mb-3">
                                    <label htmlFor="gender" className="d-block font-weight-bold">Select your gender:</label>
                                    <span className="form-icon fas fa-venus-mars"></span>
                                    <select
                                        id='gender'
                                        className={`w-100 text-white profile-select-input ${genderError.length > 0 ? ('invalid-input') : null}`}
                                        onChange={this.onChange}
                                        name='gender'
                                    >
                                        <option defaultValue>Select one</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-icon w-75 mb-3">
                                    <span className="form-icon fas fa-birthday-cake"></span>
                                    <TextInputPlusLabel
                                        id='birth_date'
                                        type='text'
                                        label='Date of birth:'
                                        placeholder="YYYY-MM-DD"
                                        name='birth_date'
                                        value={this.state.birth_date}
                                        className={`w-100 text-white profile-text-input ${birthdateError.length > 0 ? ('invalid-input') : null}`}
                                        onChange={this.onChange}
                                    />
                                </div>
                                {birthdateError.length > 0 ? (<h6 className="text-danger small-font">{`Make sure to follow the format: 'YYYY-MM-DD' `}</h6>) : null}
                            </div>
                            <div className="form-icon w-75 mb-3">
                                <span className="form-icon fas fa-location-arrow"></span>
                                <TextInputPlusLabel
                                    id='current_location'
                                    type='text'
                                    label='Where are you now?'
                                    name='current_location'
                                    value={this.state.current_location}
                                    placeholder='Current location'
                                    className={`w-100 text-white profile-text-input ${currentlocationError.length > 0 ? ('invalid-input') : null}`}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" className="create-profile-button w-75 mt-3">Create your profile!</button>
                        </form>
                    </Col>
                    <Col className="text-right hide-this" style={{ zIndex: '1' }} xs="0" md="6">
                        <div style={{ marginTop: "7em" }}>
                            <h1 className="display-4" style={{ fontStyle: 'italic' }}>TraveLogue</h1>
                            <h5 className="mt-4">Find a better way to travel.</h5>
                            <h6 className="mt-4 w-75 ml-auto">You will be able to add more information about yourself, find other users, and make posts later.</h6>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors.profileRequiredErrors
})

export default connect(mapStateToProps, { createNewProfile, getCurrentProfile })(withRouter(CreateProfileRequired))
