import React, { Component } from 'react'

class DeleteAccountModal extends Component {
    state = {
        delete: ''
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { hideModal, deleteAccount } = this.props
        return (
            <div onClick={hideModal} style={{ zIndex: "2" }} className="modal-background animated fadeIn faster close-modal">
                <div className="delete-account-modal">
                    <header className="p-3">
                        <h2>Delete Account
                            <i style={{ cursor: 'pointer' }}
                                className="far fa-times-circle float-right close-modal"></i>
                        </h2>

                    </header>
                    <section className="p-3">
                        <p>Are you sure you want to delete your account?</p>
                        <p>Note that this action cannot be reversed and all your information will be deleted from our database.</p>
                        <p>If you are sure, then please type 'delete' below.</p>
                        <div className="w-75 m-3">
                            <input type='text' name='delete' value={this.state.delete} onChange={this.onChange} style={{
                                backgroundColor: 'white',
                                border: 'darkred 1px solid',
                                height: '40px',
                                padding: '5px',
                                borderRadius: '5px',
                                width: '75%',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }} />
                            {this.state.delete === 'delete' ? (<i className="fas fa-check text-success ml-3"></i>) : null}
                        </div>
                    </section>
                    <footer className="p-3">
                        <div className="d-flex justify-content-end">
                            <button type="button" className='cancel-delete-account-button close-modal'>Cancel</button>
                            <button type="button" onClick={deleteAccount} className='delete-account-button' disabled={this.state.delete !== 'delete' ? true : false}>Delete Account</button>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default DeleteAccountModal
