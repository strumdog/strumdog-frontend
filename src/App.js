import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import SongEditor from './SongEditor';
import MockClient from './client/MockClient';
import RealClient from './client/RealClient';
import config from './config';
import SongViewer from './SongViewer';
import ErrorManager from './ErrorManager';
import Errors from './Errors';

let client;
if (config.mock) {
    client = new MockClient();
} else {
    client = new RealClient(config.baseUri);
}

const errorManager = new ErrorManager();

const SongEditorWrapper = () => (
    <SongEditor client={ client } errorManager={ errorManager } />
);

const SongViewerWrapper = (params) => (
    <SongViewer match={ params.match } client={ client } errorManager={ errorManager } />
);


class App extends Component {
  render() {
    return (
      <div className="App">
          <Row className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Strumdog</h1>
          </Row>
        <Errors manager={ errorManager } />
        <p className="App-intro">
          Copy your chord tab into the box below.
        </p>
        <Switch>
            <Route exact path="/" component={ SongEditorWrapper }/>
            <Route path="/song/:id" component={ SongViewerWrapper }/>
        </Switch>
      </div>
    );
  }
}

export default App;
