import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent'
import Footer from './components/Footer'
class App extends Component {
  state = {
    response: "",

  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

      
  }

  callApi = async () => {
    const response = await fetch("/api/mensagem");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body.recordset)
    return body;
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
