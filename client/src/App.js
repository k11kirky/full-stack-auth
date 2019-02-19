import React, { Component } from 'react';
import AuthModal from './components/auth-modal';
import * as md5 from 'md5';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      user: undefined
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
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
        return body.message
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
          user: body
        })
      } else {
        return body.message
      }
    })
  }

  render() {
    const { user, modalOpen } = this.state;
    return (
      <div className="app">
        <AuthModal
          modalOpen={modalOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
          login={this.login}
          register={this.register} />
        <header className="app-body">
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
