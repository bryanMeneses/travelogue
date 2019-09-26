import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileByUsername } from '../../actions/profileActions';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { AgeFromDateString } from 'age-calculator'

import MaleAvatar from '../../images/MaleAvatar.js'
import FemaleAvatar from '../../images/FemaleAvatar.js'
import formatDateISO from '../../utilities/formateDateISO';
import LoadingSpinner from '../layout/LoadingSpinner';

class Profile extends Component {

    componentDidMount() {
        this.props.getProfileByUsername(this.props.match.params.username);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.profile.loading && !nextProps.profile.hasProfile) {
            this.props.history.push('/not-found')
        }
    }

    render() {
        const { profile, loading } = this.props.profile

        let name, date

        if (profile.user && !loading) {
            name = profile.user.name
            date = profile.user.date
            // This returns the user.name with capital letters as expected
            name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ')

            // format date to appear as 11 June, 2019
            const formatDate = (date) => {
                const birthDate = new Date(date.replace(/-/g, '/').replace(/T.+/, ''));

                const monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ]

                const monthIndex = birthDate.getMonth()

                return `${birthDate.getDate()} ${monthNames[monthIndex]}, ${birthDate.getFullYear()}`
            }

            date = formatDate(date)
        }


        const learning_languages = [
            {
                language: 'japanese',
                level: 'Intermediate'
            },
            {
                language: 'german',
                level: 'Intermediate'
            },
        ]


        const format_birth_date = new Date(profile.birth_date)
        // user's age from birth_date
        const age = new AgeFromDateString(format_birth_date).age

        // Get correct gender avatar
        let avatar;

        switch (profile.gender) {
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

        let ProfileContent;

        if (profile === null || loading) {
            ProfileContent = <LoadingSpinner />
        } else if (!loading && profile !== null) {
            ProfileContent = (
                <div className="dashboard-container animated fadeIn">
                    <Row className="justify-content-center">
                        <Col xs="11" lg="4" className="secondary-container">
                            <div className="text-center info-container mb-3">
                                {avatar}
                                <h2>{name}</h2>
                                <p>
                                    <Link className="username-link" target="blank" to={`/user/${profile.username}`}>
                                        @{profile.username}
                                    </Link>
                                </p>
                                <a className="current-location-link" target="blank" href={`https://photix.netlify.com/search/?query=${profile.current_location}`}>
                                    <i className="fas fa-map-marker"></i>{" "}{profile.current_location}
                                </a>
                                {profile.social ? (
                                    <div>
                                        <hr />
                                        <h5>Find me also on:</h5>
                                        <p>
                                            <a className="website-link" target="blank" href={profile.social.website}><i className="fas fa-link"></i>{" "}My Website</a>
                                        </p>
                                        <p className="social-media-icons">
                                            {profile.social.twitter ?
                                                (<a target="blank" href={profile.social.twitter}><i className="fab fa-twitter" style={{ color: 'rgb(47,169,223)' }}></i></a>)
                                                : null}
                                            {profile.social.facebook ?
                                                (<a target="blank" href={profile.social.facebook}><i className="fab fa-facebook" style={{ color: 'rgb(68,101,176)' }}></i></a>)
                                                : null}
                                            {profile.social.youtube ?
                                                (<a target="blank" href={profile.social.youtube}><i className="fab fa-youtube" style={{ color: 'rgb(254,26,32)' }}></i></a>)
                                                : null}
                                            {profile.social.instagram ?
                                                (<a target="blank" href={profile.social.instagram}><i className="fab fa-instagram" style={{ color: 'rgb(225,48,108)' }}></i></a>)
                                                : null}
                                            {profile.social.linkedin ?
                                                (<a target="blank" href={profile.social.linkedin}><i className="fab fa-linkedin" style={{ color: 'rgb(14,117,179)' }}></i></a>)
                                                : null}
                                        </p>
                                    </div>
                                ) : null}

                            </div>
                        </Col>
                        <Col xs="11" lg="7" className="primary-container">
                            <div className="info-container">
                                <h4>General Info:</h4>
                                <hr />
                                <Row className="justify-content-center general-info-icon">
                                    <Col md="6">
                                        <div className="mb-3">
                                            <i className="fas fa-birthday-cake"></i>{" "}
                                            <p className="d-inline">{age} years old</p>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-mars"></i>{" "}
                                            <p className="d-inline">{profile.gender}</p>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-globe-americas"></i>{" "}
                                            <p className="d-inline">{profile.country ? `Comes from ${profile.country}` : 'This user has not yet added a country of origin.'}</p>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-home"></i>{" "}
                                            <p className="d-inline">{profile.hometown ? `Grew up in ${profile.hometown}` : 'This user has not yet added a hometown.'}</p>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-3">
                                            <i className="fas fa-user-tie"></i>{" "}
                                            <p className="d-inline">{profile.occupation ? profile.occupation : 'This user has not yet added an occupation'}</p>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-language"></i>{" "}
                                            <p className="d-inline">
                                                {profile.fluent_languages && profile.fluent_languages.length > 0 ?
                                                    (`Speaks ${profile.fluent_languages.map(cur => cur.charAt(0).toUpperCase() + cur.substring(1)).join(', ')}, fluently`)
                                                    :
                                                    'This user has not yet added languages they speak fluently.'}

                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-book-open"></i>{" "}
                                            <p className="d-inline">Is learning {learning_languages.map(cur => `${cur.language.charAt(0).toUpperCase() + cur.language.substring(1)} (${cur.level})`).join(', ')}.</p>
                                        </div>
                                        <div className="mb-3">
                                            <i className="fas fa-thumbs-up"></i>{" "}
                                            <p className="d-inline">Joined on {date}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="info-container mt-3">
                                <h4>About Me:</h4>
                                <hr />
                                <div className="profile-bio p-3">
                                    {profile.bio ? profile.bio : "This user has not yet written a bio."}
                                </div>
                                <h4>Interests:</h4>
                                <hr />
                                <div className="p-3">
                                    {profile.interests && profile.interests.length > 0 ? (profile.interests.map((cur, i) => {
                                        if (cur === /\s/ || cur === '') {
                                            return null
                                        }
                                        else {
                                            return <span className="text-success btn btn-light m-2" key={i}>{cur}</span>
                                        }
                                    })) : 'This user has not yet added any info here.'}
                                </div>
                                <h4>I have visited:</h4>
                                <hr />
                                <div className="p-3">
                                    {profile.countries_visited && profile.countries_visited.length > 0 ? (profile.countries_visited.map((cur, i) => {
                                        if (cur === /\s/ || cur === '') {
                                            return null
                                        }
                                        else {
                                            return <span className="text-light btn btn-secondary m-2" key={i}>{cur}</span>
                                        }
                                    })) : 'This user has not yet added any info here.'}
                                </div>
                                <h4>I want to visit:</h4>
                                <hr />
                                <div className="p-3">
                                    {profile.wishlist && profile.wishlist.length > 0 ? (profile.wishlist.map((cur, i) => {
                                        return <span className="text-dark btn btn-outline-info m-2" key={i}>{cur}</span>
                                    })) : 'This user has not yet added any info here.'}
                                </div>
                            </div>
                            <div className="info-container travel-plans-container mt-3 mb-3">
                                <h4>
                                    Travel Plans:
                                </h4>
                                <hr />
                                {profile.travel_plans && profile.travel_plans.length > 0 ?
                                    (
                                        profile.travel_plans.map((cur, i) => {
                                            let arrivalDate = formatDateISO(cur.arrival_date)
                                            let departureDate = formatDateISO(cur.departure_date)
                                            return (
                                                <div
                                                    className="single-travel-plan-container"
                                                    key={i}>
                                                    <p>
                                                        <i className="fas fa-map-marker-alt"></i>
                                                        {" "}
                                                        Destination:
                                                    <span
                                                            className="text-black float-right mr-5"
                                                            style={{
                                                                fontWeight: "600"
                                                            }}>
                                                            {cur.destination}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-plane-arrival"></i>{" "}
                                                        Arrival:
                                                    <span
                                                            className="text-black float-right mr-5"
                                                            style={{ fontWeight: "600" }}>
                                                            {arrivalDate}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-plane-departure"></i>{" "}
                                                        Departure:
                                                    <span
                                                            className="text-black float-right mr-5"
                                                            style={{ fontWeight: "600" }}>
                                                            {departureDate}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <i className="far fa-user"></i>{" "}
                                                        Travelers:
                                                          <span
                                                            className="text-black float-right mr-5"
                                                            style={{ fontWeight: "600" }}>
                                                            {cur.number_of_travelers}
                                                        </span>
                                                    </p>
                                                    <hr className="w-75" />
                                                    <p style={{ whiteSpace: "pre-wrap" }}>{cur.description}</p>
                                                </div>
                                            )
                                        })
                                    ) :
                                    (
                                        <div className="text-center">
                                            <p>This user has not added a travel plan.</p>
                                        </div>

                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </div >
            )
        }

        return (
            <React.Fragment>
                {ProfileContent}
            </React.Fragment>
        )

    }
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByUsername })(Profile)
