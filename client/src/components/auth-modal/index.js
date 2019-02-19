import React, { Component } from 'react';
import ReactModalLogin from 'react-modal-login';

class AuthModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: null,
            loginError: null,
            registerError: null,
        };
    }

    onLoginSuccess(method, response) {
        console.log("logged successfully with " + method);
        this.props.closeModal();
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
            error: null,
            loginError: null,
            registerError: null
        });
    }

    validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    async onLogin() {
        console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!email || !password || !this.validateEmail(email)) {
            this.setState({
                error: true,
                loginError: "Invlaid fields - please try again"
            })
        } else {
            let message = await this.props.login(email, password);
            if (message) {
                this.setState({
                    error: true,
                    loginError: message
                })
            } else {
                this.onLoginSuccess('form');
            }
        }
    }

    async onRegister() {
        console.log('__onRegister__');
        console.log('nickname: ' + document.querySelector('#nickname').value);
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);

        const nickname = document.querySelector('#nickname').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!nickname || !email || !password || !this.validateEmail(email)) {
            this.setState({
                error: true,
                registerError: "Invlaid fields - please try again"
            })
        } else {
            let message = await this.props.register(nickname, email, password)
            if (message) {
                this.setState({
                    error: true,
                    registerError: message
                })
            } else {
                this.onLoginSuccess('form');
            }
        }
    }

    render() {
        const { loginError, registerError } = this.state;
        return (
            <ReactModalLogin
                visible={this.props.modalOpen}
                onCloseModal={this.props.closeModal}
                loading={this.state.loading}
                error={this.state.error}
                tabs={{
                    afterChange: this.afterTabsChange.bind(this)
                }}
                loginError={{
                    label: loginError || "Couldn't sign in, please try again."
                }}
                registerError={{
                    label: registerError || "Couldn't sign up, please try again."
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
                            id: 'nickname',
                            name: 'nickname',
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
