import React, { Component } from 'react';
import { BrowserRouter as Router,
    Route,
    Link,
    IndexRoute,
    browserHistory } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import SongEditor from './SongEditor';

import MockClient from './client/MockClient';
const client = new MockClient();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SongEditor client={ client }/>
      </div>
    );
  }
}

export default App;
