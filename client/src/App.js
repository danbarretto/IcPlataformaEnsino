import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent'
import Footer from './components/Footer'
class App extends Component {
  state = {
    response: "",

  };

  render() {
    
    return (
      <div>
        <NavBar />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
