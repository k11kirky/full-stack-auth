import React, { Component } from 'react';
import ReactModalLogin from 'react-modal-login';

class AuthModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            loading: false,
            error: null
        };
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
            error: null
        });
    }

    onLoginSuccess(method, response) {
        console.log("logged successfully with " + method);
    }

    onLoginFail(method, response) {
        console.log("logging failed with " + method);
        this.setState({
            error: response
        });
    }

    startLoading() {
        this.setState({
            loading: true
        });
    }

    finishLoading() {
        this.setState({
            loading: false
        });
    }

    afterTabsChange() {
        this.setState({
            error: null
        });
    }

    onLogin() {
        console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!email || !password) {
            this.setState({
                error: true
            })
        } else {
            this.onLoginSuccess('form');
        }
    }

    onRegister() {
        console.log('__onRegister__');
        console.log('login: ' + document.querySelector('#login').value);
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);

        const login = document.querySelector('#login').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!login || !email || !password) {
            this.setState({
                error: true
            })
        } else {
            this.onLoginSuccess('form');
        }
    }

    onRecoverPassword() {
        console.log('__onFotgottenPassword__');
        console.log('email: ' + document.querySelector('#email').value);

        const email = document.querySelector('#email').value;


        if (!email) {
            this.setState({
                error: true,
                recoverPasswordSuccess: false
            })
        } else {
            this.setState({
                error: null,
                recoverPasswordSuccess: true
            });
        }
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
                form={{
                    onLogin: this.onLogin.bind(this),
                    onRegister: this.onRegister.bind(this),
                    loginBtn: {
                        label: "Sign in"
                    },
                    registerBtn: {
                        label: "Sign up"
                    },
                    recoverPasswordBtn: {
                        label: "Send new password"
                    },
                    loginInputs: [
                        {
                            containerClass: 'RML-form-group',
                            label: 'Email',
                            type: 'email',
                            inputClass: 'RML-form-control',
                            id: 'email',
                            name: 'email',
                            placeholder: 'Email',
                        },
                        {
                            containerClass: 'RML-form-group',
                            label: 'Password',
                            type: 'password',
                            inputClass: 'RML-form-control',
                            id: 'password',
                            name: 'password',
                            placeholder: 'Password',
                        }
                    ],
                    registerInputs: [
                        {
                            containerClass: 'RML-form-group',
                            label: 'Nickname',
                            type: 'text',
                            inputClass: 'RML-form-control',
                            id: 'login',
                            name: 'login',
                            placeholder: 'Nickname',
                        },
                        {
                            containerClass: 'RML-form-group',
                            label: 'Email',
                            type: 'email',
                            inputClass: 'RML-form-control',
                            id: 'email',
                            name: 'email',
                            placeholder: 'Email',
                        },
                        {
                            containerClass: 'RML-form-group',
                            label: 'Password',
                            type: 'password',
                            inputClass: 'RML-form-control',
                            id: 'password',
                            name: 'password',
                            placeholder: 'Password',
                        }
                    ],
                    recoverPasswordInputs: [
                        {
                            containerClass: 'RML-form-group',
                            label: 'Email',
                            type: 'email',
                            inputClass: 'RML-form-control',
                            id: 'email',
                            name: 'email',
                            placeholder: 'Email',
                        },
                    ],
                }}
            />
        );
    }
}

export default AuthModal;
