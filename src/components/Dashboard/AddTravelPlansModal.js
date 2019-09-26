import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel'
import { createTravelPlan } from '../../actions/profileActions'

class AddTravelPlansModal extends Component {
    state = {
        destination: '',
        arrival_date: '',
        departure_date: '',
        number_of_travelers: '',
        description: '',
        errors: false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors.length > 0) {
            this.setState({ errors: true })
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const { destination, arrival_date, departure_date, description } = this.state;


        const number_of_travelers = parseInt(this.state.number_of_travelers)

        const newTravelPlan = {
            destination,
            arrival_date,
            departure_date,
            number_of_travelers,
            description
        }

        this.props.createTravelPlan(newTravelPlan)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const errorMessage = this.state.errors ? (
            <div className="text-danger">
                <ul>
                    <li>All fields are required</li>
                    <li>Dates should be in "YYYY-MM-DD" format.</li>
                </ul>
            </div>
        ) : null

        return (
            <div
                className="modal-background animated fadeIn close-modal"
                onClick={this.props.hideModal}>
                <div className="add-travel-modal animated bounceInDown" >
                    <header className="p-4">
                        <h4>
                            Create a Travel Plan
                            <i style={{ cursor: 'pointer' }}
                                className="far fa-times-circle float-right close-modal"></i>
                        </h4>

                    </header>
                    <div
                        className="p-3 add-travel-modal-2nd-box">
                        <p>Your travel plans are shown from newest first.</p>
                        <p>They will also be posted to the main feed for everyone to see.</p>
                    </div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className="p-4">
                                {errorMessage}
                                <TextInputPlusLabel
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    label="Destination*"
                                    placeholder="Where are you going"
                                    className="w-100 mb-3"
                                    value={this.state.destination}
                                    onChange={this.onChange}
                                />
                                <TextInputPlusLabel
                                    type="text"
                                    id="arrival_date"
                                    name="arrival_date"
                                    className="w-100 mb-3"
                                    label="Arrival Date*"
                                    placeholder="When will you arrive"
                                    value={this.state.arrival_date}
                                    onChange={this.onChange}
                                />
                                <TextInputPlusLabel
                                    type="text"
                                    id="departure_date"
                                    name="departure_date"
                                    className="w-100 mb-3"
                                    label="Departure Date*"
                                    placeholder="When does your trip end"
                                    value={this.state.departure_date}
                                    onChange={this.onChange}
                                />
                                <TextInputPlusLabel
                                    type="text"
                                    id="number_of_travelers"
                                    name="number_of_travelers"
                                    className="w-100 mb-3"
                                    label="# of Guests*"
                                    placeholder="How many people are going:"
                                    value={this.state.number_of_travelers}
                                    onChange={this.onChange}
                                />
                                <label className="d-block font-weight-bold" htmlFor="description">Briefly describe your trip*</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="w-100"
                                    placeholder="Description"
                                    onChange={this.onChange}
                                    value={this.state.description}
                                ></textarea>
                            </div>
                            <footer className="p-4">
                                <div>
                                    <button>Add Plan</button>
                                </div>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors.travelPlanErrors
})

export default connect(mapStateToProps, { createTravelPlan })(AddTravelPlansModal)
