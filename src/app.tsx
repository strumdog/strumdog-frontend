import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import logo from './SD-logo-shape.svg'
import './App.css'
import SongEditor from './song-editor'
import MockClient from './client/MockClient'
import RealClient from './client/RealClient'
import config from './config'
import SongViewer from './song-viewer'
import { IMatchParams as ISongViewerMatchParams } from './song-viewer'
import ErrorManager from './ErrorManager'
import Errors from './Errors'
import { HashRouter } from 'react-router-dom'

let client: any
if (config.mock) {
  client = new MockClient()
} else {
  client = new RealClient(config.baseUri)
}

const errorManager = new ErrorManager()

const SongEditorWrapper = () => (
  <SongEditor client={client} errorManager={errorManager} />
)

const SongViewerWrapper = ({
  match: { params },
}: {
  match: { params: ISongViewerMatchParams }
}) => {
  const { id } = params
  return <SongViewer id={id} client={client} errorManager={errorManager} />
}

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Row className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Strumdog</h1>
          </Row>
          <Errors manager={errorManager} />
          <Switch>
            <Route exact path="/" component={SongEditorWrapper} />
            <Route path="/song/:id" component={SongViewerWrapper} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}
