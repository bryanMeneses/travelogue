import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextInputPlusLabel from '../InputGroups/TextInputPlusLabel'
import { addLearningLanguage } from '../../actions/profileActions'

class AddLanguageModal extends Component {
    state = {
        language: '',
        level: '',
        errors: false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors.length > 0) {
            this.setState({ errors: true })
        }

        if (nextProps.errors.length < this.props.errors.length) {
            this.setState({ errors: false })
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const { language, level } = this.state

        const newLanguage = {
            language,
            level
        }

        this.props.addLearningLanguage(newLanguage)

        this.setState({ language: '', level: '' })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { addLanguageLoading, hideModal } = this.props;

        const learningLanguageError = this.state.errors ? (
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

        const languageLoadingMsg = addLanguageLoading ?
            (
                <React.Fragment>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {" "}Loading...
                </React.Fragment>
            ) :
            (
                <React.Fragment>
                    Add Language
                </React.Fragment>
            )

        return (
            <div
                className="modal-background animated fadeIn faster close-modal"
                onClick={hideModal} style={{ zIndex: "2" }} >
                <div className="add-language-modal" >
                    <header className="p-4">
                        <h4>
                            What Languages Are You Learning?
                            <i style={{ cursor: 'pointer' }}
                                className="far fa-times-circle float-right close-modal"></i>
                        </h4>
                    </header>
                    <div className="p-3 main">
                        <form onSubmit={this.onSubmit}>
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
                            <div className="mt-3 d-flex justify-content-end" style={{ position: 'relative' }}>
                                {learningLanguageError}
                                <button type="submit" className="add-language-button">{languageLoadingMsg}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors.learningLanguageErrors
})

export default connect(mapStateToProps, { addLearningLanguage })(AddLanguageModal)
