import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel';

import { getCurrentProfile, submitOptionalInfo, clearProfileOptionalInfoErrors, addLearningLanguage, deleteLearningLanguage, clearLearningLanguageErrors } from '../../actions/profileActions';

import LoadingSpinner from '../layout/LoadingSpinner';
import AddLanguageModal from './AddLanguageModal';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            interests: '',
            countries_visited: '',
            wishlist: '',
            fluent_languages: '',
            occupation: '',
            hometown: '',
            country: '',
            website: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            facebook: '',
            twitter: '',
            profileOptionalInfoError: false,
            showLanguageModal: false
        }
    }

    componentDidMount() {
        if (!this.props.hasProfile) {
            this.props.getCurrentProfile();
        }
        window.addEventListener('keydown', e => {
            if (this.state.showLanguageModal)
                if (e.keyCode === 27) {
                    this.setState({
                        showLanguageModal: false
                    })
                }
        })
    }

    componentWillUnmount() {
        if (this.props.profileOptionalInfoErrors.length > 0) {
            this.props.clearProfileOptionalInfoErrors()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.profile.hasProfile) {

            const { profile } = nextProps.profile

            const interests = profile.interests ? profile.interests.join(', ') : ''
            const countries_visited = profile.countries_visited ? profile.countries_visited.join(', ') : ''
            const wishlist = profile.wishlist ? profile.wishlist.join(', ') : ''
            const fluent_languages = profile.fluent_languages ? profile.fluent_languages.join(', ') : ''

            const country = profile.country ? profile.country : ''
            const bio = profile.bio ? profile.bio : ''
            const occupation = profile.occupation ? profile.occupation : ''
            const hometown = profile.hometown ? profile.hometown : ''
            const linkedin = profile.social && profile.social.linkedin ? profile.social.linkedin : ''
            const facebook = profile.social && profile.social.facebook ? profile.social.facebook : ''
            const website = profile.social && profile.social.website ? profile.social.website : ''
            const youtube = profile.social && profile.social.youtube ? profile.social.youtube : ''
            const twitter = profile.social && profile.social.twitter ? profile.social.twitter : ''
            const instagram = profile.social && profile.social.instagram ? profile.social.instagram : ''

            this.setState({
                bio,
                interests,
                countries_visited,
                wishlist,
                fluent_languages,
                occupation,
                hometown,
                country,
                youtube,
                facebook,
                twitter,
                instagram,
                website,
                linkedin
            })
        }

        if (nextProps.profileOptionalInfoErrors.length > 0) {
            this.setState({ profileOptionalInfoError: true })
        }

        if (nextProps.profileOptionalInfoErrors.length < this.props.profileOptionalInfoErrors.length) {
            this.setState({ profileOptionalInfoError: false })
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    submitOptionalInfo = e => {
        e.preventDefault()

        const { bio, interests, countries_visited, wishlist, fluent_languages, occupation, hometown, country, youtube, facebook, twitter, instagram, website, linkedin } = this.state

        const profileOptionalInfo = {
            bio,
            interests,
            countries_visited,
            wishlist,
            fluent_languages,
            occupation,
            hometown,
            country,
            youtube,
            facebook,
            twitter,
            instagram,
            website,
            linkedin
        }
        this.props.submitOptionalInfo(profileOptionalInfo, this.props.history)
    }

    deleteLearningLanguage = (id, e) => {
        e.preventDefault()

        if (!window.confirm("Are you sure you want to delete this?")) return
        this.props.deleteLearningLanguage(id)
    }

    hideLanguageModal = e => {
        if (this.state.showLanguageModal && e.target.className.includes('close-modal')) {
            this.setState({
                showLanguageModal: false,
            })
        }
    }


    render() {
        const { profile, loading, editProfileLoading, addLanguageLoading } = this.props.profile

        const editProfileLoadingMsg = editProfileLoading ?
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


        const profileOptionalInfoError = this.state.profileOptionalInfoError ? (
            <div className='text-danger w-50'
                style={{ position: 'absolute', left: '0', top: '-25px', fontSize: '.95rem' }}>
                <ul>
                    <li>
                        Hometown, occupation, and bio fields are at least 2 characters long.
                    </li>
                    <li>
                        Your links meet the required format. <a href="https://tools.ietf.org/html/rfc3986?#section-1.1.2" target="blank">Read here.</a>
                    </li>
                </ul>
            </div>
        ) : null


        if (profile === null || loading) {
            return (
                <React.Fragment>
                    <LoadingSpinner />
                </React.Fragment>)
        } else if (!loading && profile !== null) {
            return (
                <div className="edit-profile-container animated fadeIn">

                    {this.state.showLanguageModal ? (<AddLanguageModal addLanguageLoading={addLanguageLoading} hideModal={this.hideLanguageModal} />) : null}
                    {/* Contains Form for non-required api/profile/info route */}
                    <div className="primary-container">
                        <div className="info-container">
                            <form onSubmit={this.submitOptionalInfo}>
                                <h2>About Me:</h2>
                                <div>
                                    <label className="d-block font-weight-bold" htmlFor="bio">Bio:</label>
                                    <textarea
                                        id="bio"
                                        className="edit-profile-textarea mb-3"
                                        placeholder="Please tell us about yourself."
                                        onChange={this.onChange}
                                        value={this.state.bio}
                                        name='bio'
                                    ></textarea>
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fas fa-globe"></span>
                                    <TextInputPlusLabel
                                        name="country"
                                        id='country'
                                        placeholder="What country are you from?"
                                        label="Country:"
                                        onChange={this.onChange}
                                        value={this.state.country}
                                        className='w-100 profile-text-input'
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fas fa-home"></span>
                                    <TextInputPlusLabel
                                        name="hometown"
                                        id='hometown'
                                        placeholder="Where did you grow up?"
                                        label="Hometown:"
                                        onChange={this.onChange}
                                        value={this.state.hometown}
                                        className={`w-100 ml-1 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fas fa-user-tie"></span>
                                    <TextInputPlusLabel
                                        name="occupation"
                                        id='occupation'
                                        placeholder="What do you do?"
                                        label="Occupation:"
                                        onChange={this.onChange}
                                        value={this.state.occupation}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fas fa-language"></span>
                                    <TextInputPlusLabel
                                        name="fluent_languages"
                                        id='fluent_languages'
                                        placeholder="What languages do you speak fluently?"
                                        label="Fluent languages:"
                                        onChange={this.onChange}
                                        value={this.state.fluent_languages}
                                        className={`w-100 ml-1 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3">
                                    <span className="form-icon fas fa-flag"></span>
                                    <TextInputPlusLabel
                                        name="interests"
                                        id='interests'
                                        placeholder="Hobbies/interests"
                                        label="Interests:"
                                        onChange={this.onChange}
                                        value={this.state.interests}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3">
                                    <span className="form-icon fas fa-globe-europe"></span>
                                    <TextInputPlusLabel
                                        name="countries_visited"
                                        id='countries_visited'
                                        placeholder="Where have you been?"
                                        label="I have visited:"
                                        onChange={this.onChange}
                                        value={this.state.countries_visited}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3">
                                    <span className="form-icon fas fa-grin-stars"></span>
                                    <TextInputPlusLabel
                                        name="wishlist"
                                        id='wishlist'
                                        placeholder="Where do you want to go?"
                                        label="I want to visit:"
                                        onChange={this.onChange}
                                        value={this.state.wishlist}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <h2>Learning Languages:
                                <i onClick={() => this.setState({ showLanguageModal: true })} className="fas fa-plus language-modal-button"></i>
                                </h2>

                                <div className="mb-4 mt-4">
                                    {profile.learning_languages && profile.learning_languages.length > 0 ? (
                                        profile.learning_languages.map((cur, i) => {
                                            cur.language = cur.language.charAt(0).toUpperCase() + cur.language.substring(1)
                                            return (
                                                <React.Fragment key={i} >
                                                    <div className="m-2 d-inline-block learning-language-holder">
                                                        <div className="d-inline-block learning-language-tag">
                                                            <span>{cur.language}: {cur.level}</span>
                                                        </div>
                                                        <div
                                                            onClick={this.deleteLearningLanguage.bind(null, cur._id)}
                                                            className="d-inline-block learning-language-delete">
                                                            <i

                                                                className="fas fa-times text-danger"></i>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        )
                                    ) :
                                        null}
                                </div>
                                <h2>Social:</h2>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fas fa-link"></span>
                                    <TextInputPlusLabel
                                        name="website"
                                        id='website'
                                        placeholder="Personal/professional website."
                                        label="Website:"
                                        onChange={this.onChange}
                                        value={this.state.website}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fab fa-facebook"></span>
                                    <TextInputPlusLabel
                                        name="facebook"
                                        id='facebook'
                                        placeholder="Facebook"
                                        label="Facebook:"
                                        onChange={this.onChange}
                                        value={this.state.facebook}
                                        className={`w-100 ml-1 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fab fa-instagram"></span>
                                    <TextInputPlusLabel
                                        name="instagram"
                                        id='instagram'
                                        placeholder="Instagram"
                                        label="Instagram:"
                                        onChange={this.onChange}
                                        value={this.state.instagram}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fab fa-linkedin"></span>
                                    <TextInputPlusLabel
                                        name="linkedin"
                                        id='linkedin'
                                        placeholder="LinkedIn"
                                        label="LinkedIn:"
                                        onChange={this.onChange}
                                        value={this.state.linkedin}
                                        className={`w-100 ml-1 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fab fa-youtube"></span>
                                    <TextInputPlusLabel
                                        name="youtube"
                                        id='youtube'
                                        placeholder="YouTube"
                                        label="YouTube:"
                                        onChange={this.onChange}
                                        value={this.state.youtube}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon mb-3 w-50 d-inline-block">
                                    <span className="form-icon fab fa-twitter"></span>
                                    <TextInputPlusLabel
                                        name="twitter"
                                        id='twitter'
                                        placeholder="Twitter"
                                        label="Twitter:"
                                        onChange={this.onChange}
                                        value={this.state.twitter}
                                        className={`w-100 ml-1 profile-text-input`}
                                    />
                                </div>
                                <footer style={{ position: 'relative' }}>
                                    {profileOptionalInfoError}
                                    <div className="w-50 ml-auto mt-3">
                                        <button type="submit" className="edit-profile-info-button">{editProfileLoadingMsg}</button>
                                    </div>
                                </footer>
                            </form>
                        </div>
                    </div>
                </div >
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
        submitOptionalInfo,
        clearProfileOptionalInfoErrors,
        addLearningLanguage,
        deleteLearningLanguage,
        clearLearningLanguageErrors
    })(withRouter(EditProfile))
