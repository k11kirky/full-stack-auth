import React, { Component } from 'react';
import AuthModal from './components/auth-modal';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-body">
          <AuthModal/>
        </header>
      </div>
    );
  }
}

export default App;
