import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AuthModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            loading: false,
            error: null
        };

    }
    render() {
        return (
            <ReactModalLogin
                visible={this.state.showModal}
                onCloseModal={this.closeModal.bind(this)}
                loading={this.state.loading}
                error={this.state.error}
                tabs={{
                    afterChange: this.afterTabsChange.bind(this)
                }}
                loginError={{
                    label: "Couldn't sign in, please try again."
                }}
                registerError={{
                    label: "Couldn't sign up, please try again."
                }}
                startLoading={this.startLoading.bind(this)}
                finishLoading={this.finishLoading.bind(this)}
            />
        );
    }
}

export default AuthModal;
