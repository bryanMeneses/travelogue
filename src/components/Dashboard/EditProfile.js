import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel';

import { getCurrentProfile, createNewProfile, submitOptionalInfo, clearProfileRequiredErrors, clearProfileOptionalInfoErrors, addLearningLanguage, deleteLearningLanguage, deleteAccount } from '../../actions/profileActions';



import MaleAvatar from '../../images/MaleAvatar.js'
import FemaleAvatar from '../../images/FemaleAvatar.js'
import formatDateISO from '../../utilities/formateDateISO';
import DeleteAccountModal from './DeleteAccountModal';
import LoadingSpinner from '../layout/LoadingSpinner';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            gender: '',
            birth_date: '',
            current_location: '',
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
            language: '',
            level: '',
            profileOptionalInfoError: false,
            learningLanguageError: false,
            showDeleteAccountModal: false
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

    componentWillUnmount() {
        if (this.props.profileOptionalInfoErrors.length > 0) {
            this.props.clearProfileOptionalInfoErrors()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.profile.hasProfile) {

            const { profile } = nextProps.profile

            // ------ Here starts profile required info

            const { username, gender, current_location } = profile

            let { birth_date } = profile

            // format date to appear as 'YYYY-MM-DD'
            birth_date = formatDateISO(birth_date)

            // ------ Here ends profile required info

            // ------ Here starts profile optional info
            // must always check if it exists in the profile object

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
                username,
                gender,
                birth_date,
                current_location,
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

        if (nextProps.learningLanguageErrors.length > 0) {
            this.setState({ learningLanguageError: true })
        }

        if (nextProps.learningLanguageErrors.length < this.props.learningLanguageErrors.length) {
            this.setState({ learningLanguageError: false })
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
        this.props.submitOptionalInfo(profileOptionalInfo)
    }

    submitLearningLanguage = e => {
        e.preventDefault();

        const { language, level } = this.state

        const newLanguage = {
            language,
            level
        }

        this.props.addLearningLanguage(newLanguage)

        this.setState({ language: '', level: '' })
    }

    deleteLearningLanguage = (id, e) => {
        e.preventDefault()

        if (!window.confirm("Are you sure you want to delete this?")) return
        this.props.deleteLearningLanguage(id)
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
        const { profile, loading } = this.props.profile
        const { current_location } = profile

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
        const learningLanguageError = this.state.learningLanguageError ? (
            <div className='text-danger w-50'
                style={{ position: 'absolute', left: '0', top: '-25px', fontSize: '.95rem' }}>
                <ul>
                    <li>
                        Make sure you have entered a value for both language and level.
                    </li>
                    <li>
                        You might have already added that language before.
                    </li>
                </ul>
            </div>
        ) : null

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
                <div className="edit-profile-container">
                    <LoadingSpinner />
                </div>)
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
                                <h5>Edit Required Info:</h5>
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
                                    <button type="submit" className="create-profile-button w-50 mt-3">Edit Info</button>
                                </form>
                            </section>
                        </div>
                    </div>

                    {/* Contains Form for non-required api/profile/info route */}
                    <div className="primary-container">
                        <div className="info-container">
                            <form onSubmit={this.submitOptionalInfo}>
                                <h2>Edit About Me:</h2>
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
                                <h2>Edit Social:</h2>
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
                                        <button type="submit" className="edit-profile-info-button">Edit Profile</button>
                                    </div>
                                </footer>
                            </form>
                        </div>
                        <div className="info-container mt-3">
                            <form onSubmit={this.submitLearningLanguage}>
                                <h2>Edit Learning Languages:</h2>
                                <div className="mb-3 mt-3">
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
                                        <span className="">Oops. It looks like you aren't learning anything yet! You can add a new language below.</span>}
                                </div>
                                <div className="w-50 form-icon mb-3 mt-2 d-inline-block">
                                    <span className="form-icon fas fa-language"></span>
                                    <TextInputPlusLabel
                                        name="language"
                                        id='language'
                                        placeholder="Language"
                                        label="Language:"
                                        onChange={this.onChange}
                                        value={this.state.language}
                                        className={`w-100 profile-text-input`}
                                    />
                                </div>
                                <div className="form-icon w-50 mb-3 d-inline-block">
                                    <label htmlFor="level" className="d-block font-weight-bold">Select your level:*</label>
                                    <span className="form-icon fas fa-medal"></span>
                                    <select
                                        id='level'
                                        className={`w-100 ml-1 profile-select-input`}
                                        onChange={this.onChange}
                                        name='level'
                                        value={this.state.level}
                                    >
                                        <option>Select one</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Elementary">Elementary</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Upper Intermediate">Upper Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <footer style={{ position: 'relative' }}>
                                    {learningLanguageError}
                                    <div className="w-50 ml-auto mt-3">
                                        <button type="submit" className="edit-profile-info-button">Add Language</button>
                                    </div>
                                </footer>
                            </form>
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
    learningLanguageErrors: state.errors.learningLanguageErrors
})

export default connect(mapStateToProps,
    {
        getCurrentProfile,
        createNewProfile,
        submitOptionalInfo,
        clearProfileRequiredErrors,
        clearProfileOptionalInfoErrors,
        addLearningLanguage,
        deleteLearningLanguage,
        deleteAccount
    })(withRouter(EditProfile))
