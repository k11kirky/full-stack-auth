import React, { Component } from 'react';
import AuthModal from './components/auth-modal';
import * as md5 from 'md5';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      user: undefined,
      userNotVerified: false,
      verificationUrl: undefined
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.setVerificationUrl = this.setVerificationUrl.bind(this);
  }

  openModal() {
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalOpen: false
    })
  }

  setVerificationUrl(url) {
    this.setState({
      verificationUrl: url
    })
  }

  register(nickname, email, password) {
    return fetch("http://localhost:4000/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname,
        email,
        password
      }),
    }).then(async (response) => {
      let body = await response.json();
      console.log(body);
      if (body.message != "success") {
        if (body.message == "user not verifed") {
          this.setVerificationUrl(body.previewUrl)
        }
        return body.message
      } else {
        this.setVerificationUrl(body.previewUrl)
      }
    })
  }

  login(email, password) {
    return fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: md5(password)
      })
    }).then(async (response) => {
      let body = await response.json();
      if (body.message == "success") {
        this.setState({
          user: body,
          verificationUrl: undefined
        })
      } else {
        return body.message
      }
    })
  }

  render() {
    const { user, modalOpen, verificationUrl } = this.state;
    console.log(verificationUrl)
    return (
      <div className="app">
        <AuthModal
          modalOpen={modalOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          login={this.login}
          register={this.register} />
        <header className="app-body">
          {verificationUrl ?
            (<div>
              <p>
                Thanks for registering, please go to the mock email account by copying the link:</p>
              <input value={verificationUrl} />
            </div>) : null}
          <h1>{user ? `Welcome ${user.nickname}` : "Please Log In"}</h1>
          <hr />
          {user ?
            (<button onClick={this.openModal}>Log Out</button>)
            : (<button onClick={this.openModal}>Log In</button>)}
        </header>
      </div>
    );
  }
}

export default App;
