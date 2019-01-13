import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Row } from 'react-bootstrap'
import { HashRouter } from 'react-router-dom'
import MockClient from '../../client/mock-client'
import RealClient from '../../client/real-client'
import config from '../../config'
import ErrorManager from '../../ErrorManager'
import logo from '../common/logo.svg'
import Errors from '../common/errors'
import SongCreator from '../song-creator/song-creator'
import SongViewer, {
  IMatchParams as ISongViewerMatchParams,
} from '../song-viewer/song-viewer'

let client: any
if (config.mock) {
  client = new MockClient()
} else {
  client = new RealClient(config.baseUri!)
}

const errorManager = new ErrorManager()

const SongCreatorWrapper = () => (
  <SongCreator client={client} errorManager={errorManager} />
)

const SongViewerWrapper = ({
  match: { params },
}: {
  match: { params: ISongViewerMatchParams }
}) => {
  const { id } = params
  return <SongViewer id={id} client={client} errorManager={errorManager} />
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:900');
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled(Row)`
  background-color: #222;
  height: auto;
  padding: 33px;
  color: white;
`

const H1 = styled.h1`
  font-size: 3em;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
`

const Logo = styled.img`
  height: 100px;
`

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <AppContainer>
          <GlobalStyle />
          <AppHeader>
            <Logo src={logo} alt="logo" />
            <H1>Strumdog</H1>
          </AppHeader>
          <Errors manager={errorManager} />
          <Switch>
            <Route exact path="/" component={SongCreatorWrapper} />
            <Route path="/song/:id" component={SongViewerWrapper} />
          </Switch>
        </AppContainer>
      </HashRouter>
    )
  }
}
