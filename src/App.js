import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SongEditor from './SongEditor';
import MockClient from './client/MockClient';
import RealClient from './client/RealClient';
import config from './config';
import SongViewer from './SongViewer.js'

let client;
if (config.mock) {
    client = new MockClient();
} else {
    client = new RealClient(config.baseUri);
}

const SongEditorWrapper = () => (
    <SongEditor client={ client }/>
);

const SongView = (params) => {
  return (
      <SongViewer match={params.match} client={client} />
  );
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Strumdog</h1>
        </header>
        <p className="App-intro">
          Copy your chord tab into the box below.
        </p>
        <Switch>
            <Route exact path="/" component={SongEditorWrapper}/>
            <Route path="/song/:id" component={SongView}/>
        </Switch>
      </div>
    );
  }
}

export default App;
