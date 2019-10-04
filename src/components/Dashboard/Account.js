import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel';

import { getCurrentProfile, createNewProfile, clearProfileRequiredErrors, deleteAccount } from '../../actions/profileActions';



import MaleAvatar from '../../images/MaleAvatar.js'
import FemaleAvatar from '../../images/FemaleAvatar.js'
import formatDateISO from '../../utilities/formateDateISO';
import DeleteAccountModal from './DeleteAccountModal';
import LoadingSpinner from '../layout/LoadingSpinner';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            gender: '',
            birth_date: '',
            current_location: '',
            showDeleteAccountModal: false,
        }
    }

    componentDidMount() {
        if (!this.props.hasProfile) {
            this.props.getCurrentProfile();
        }

        window.addEventListener('keydown', e => {
            if (this.state.showDeleteAccountModal)
                if (e.keyCode === 27) {
                    this.setState({
                        showDeleteAccountModal: false,
                    })
                }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.profile.hasProfile) {

            const { profile } = nextProps.profile

            const { username, gender, current_location } = profile

            let { birth_date } = profile

            // format date to appear as 'YYYY-MM-DD'
            birth_date = formatDateISO(birth_date)

            this.setState({
                username,
                gender,
                birth_date,
                current_location,

            })
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitRequiredInfo = e => {
        e.preventDefault()

        const { username, gender, birth_date, current_location } = this.state

        const editedRequiredInfo = {
            username,
            gender,
            birth_date,
            current_location
        }

        // This method for creating new profile can be used again because it will update the provided required info
        this.props.createNewProfile(editedRequiredInfo)
    }

    hideModal = e => {
        if (this.state.showDeleteAccountModal && e.target.className.includes('close-modal')) {
            this.setState({
                showDeleteAccountModal: false,
            })
        }
    }

    deleteAccount = e => {
        this.props.deleteAccount(this.props.history)
    }

    render() {
        const { profile, loading, profileRequiredLoading } = this.props.profile
        const { current_location } = profile

        const editAccountMsg = profileRequiredLoading ?
            (
                <React.Fragment>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {" "}Loading...
                </React.Fragment>
            ) :
            (
                <React.Fragment>
                    Save
                </React.Fragment>
            )



        // Get correct gender avatar
        let avatar;

        switch (this.state.gender) {
            case "Male": {
                avatar = <MaleAvatar />
                break;
            }
            case "Female": {
                avatar = <FemaleAvatar />
                break;
            }
            case "Other": {
                avatar = null
                break;
            }
            default: {
                avatar = null
            }

        }

        // This returns the user.name with capital letters as expected
        let { name } = this.props.auth.user
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ')

        if (profile === null || loading) {
            return (
                <React.Fragment>
                    <LoadingSpinner />
                </React.Fragment>)
        } else if (!loading && profile !== null) {
            return (
                <div className="edit-profile-container animated fadeIn">
                    {this.state.showDeleteAccountModal ? (<DeleteAccountModal deleteAccount={this.deleteAccount} hideModal={this.hideModal} />) : null}
                    <div className="secondary-container">
                        <div className="text-center info-container mb-3">
                            <header>
                                {avatar}
                                <h2>{name}</h2>
                                <p>
                                    <Link className="username-link" target="blank" to={`/user/${profile.username}`}>
                                        @{profile.username}
                                    </Link>
                                </p>
                                <a className="current-location-link" target="blank" href={`https://photix.netlify.com/search/?query=${current_location}`}>
                                    <i className="fas fa-map-marker"></i>{" "}{current_location}
                                </a>
                            </header>
                            <section>
                                <h5>Required Info:</h5>
                                <form onSubmit={this.onSubmitRequiredInfo}>
                                    <div className="form-icon mb-3">
                                        <span className="form-icon fas fa-user"></span>
                                        <TextInputPlusLabel
                                            id='username'
                                            type='text'
                                            label='Unique username:*'
                                            name='username'
                                            value={this.state.username}
                                            placeholder='Username'
                                            className='w-100 profile-text-input'
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    {<p className="small-font">https://www.travelogue/com/{this.state.username}</p>}
                                    <div>
                                        <div className="form-icon mb-3">
                                            <label htmlFor="gender" className="d-block font-weight-bold">Select your gender:*</label>
                                            <span className="form-icon fas fa-venus-mars"></span>
                                            <select
                                                id='gender'
                                                className='w-100 profile-select-input'
                                                onChange={this.onChange}
                                                name='gender'
                                                value={this.state.gender}
                                            >
                                                <option>Select one</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-icon mb-3">
                                            <span className="form-icon fas fa-birthday-cake"></span>
                                            <TextInputPlusLabel
                                                id='birth_date'
                                                type='text'
                                                label='Date of birth:*'
                                                placeholder="YYYY-MM-DD"
                                                name='birth_date'
                                                value={this.state.birth_date}
                                                className='w-100 profile-text-input'
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-icon mb-3">
                                        <span className="form-icon fas fa-location-arrow"></span>
                                        <TextInputPlusLabel
                                            id='current_location'
                                            type='text'
                                            label='Where are you now?*'
                                            name='current_location'
                                            value={this.state.current_location}
                                            placeholder='Current location'
                                            className='w-100 profile-text-input'
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <button type="submit" className="create-profile-button w-50 mt-3">{editAccountMsg}</button>
                                </form>
                            </section>
                        </div>
                        <div className="text-center info-container mt-3 p-3">
                            <h4>Do you wish to <span className="text-danger">delete</span> your account?</h4>
                            <div style={{ width: '33%', margin: 'auto', maxWidth: '200px' }}>
                                <button onClick={() => this.setState({ showDeleteAccountModal: true })} className="delete-account-button w-100">Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    profileOptionalInfoErrors: state.errors.profileOptionalInfoErrors,
})

export default connect(mapStateToProps,
    {
        getCurrentProfile,
        createNewProfile,
        clearProfileRequiredErrors,
        deleteAccount
    })(withRouter(Account))
