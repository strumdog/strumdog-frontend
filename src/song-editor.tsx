/* eslint-disable no-undef */

import * as React from 'react'
import { parseInputText } from './chord-parser'
import {
  Button,
  FormGroup,
  FormControl,
  Row,
  Col,
  ControlLabel,
  Checkbox,
} from 'react-bootstrap'
import './SongEditor.css'
import { withRouter, RouteComponentProps } from 'react-router-dom'

export interface IProps extends RouteComponentProps<{}> {
  client: any
  errorManager: any
}

class SongEditor extends React.Component<IProps> {
  private titleTextInput: any
  private songTextInput: any
  private lyricsCleanerChecked: any

  async maybeClean(lyrics: string, shouldClean: boolean) {
    if (shouldClean) {
      return this.props.client.cleanLyrics(lyrics)
    } else {
      return lyrics
    }
  }

  handleUpdate = async () => {
    const { history } = this.props

    const titleText = this.titleTextInput.value
    const songText = this.songTextInput.value
    const lyricsCleanerChecked =
      this.lyricsCleanerChecked.value === 'on' ? true : false

    const cleaned = await this.maybeClean(songText, lyricsCleanerChecked)
    const { lyrics, chords } = parseInputText(cleaned)

    let id
    try {
      id = await this.props.client.createSong(titleText, lyrics, chords)
    } catch (e) {
      this.props.errorManager.addError(e)
      return
    }

    console.log(`Song created: ${id}`)
    history.push(`/song/${id}`)
  }

  render() {
    return (
      <div>
        <Col xs={6} xsOffset={3}>
          <h4>Copy your chord tab into the box below.</h4>
          <form>
            <FormGroup>
              <ControlLabel className="pull-left">Song title</ControlLabel>
              <FormControl
                componentClass="input"
                inputRef={titleTextInput =>
                  (this.titleTextInput = titleTextInput)
                }
              />
              <ControlLabel className="pull-left">Chord tab</ControlLabel>
              <FormControl
                componentClass="textarea"
                style={{ fontFamily: 'monospace' }}
                inputRef={songTextInput => (this.songTextInput = songTextInput)}
              />
              <Row>
                <Checkbox
                  inline
                  inputRef={ref => (this.lyricsCleanerChecked = ref)}
                >
                  Use lyrics cleaner
                </Checkbox>
                <Button
                  bsStyle="primary"
                  bsSize="lg"
                  onClick={this.handleUpdate}
                >
                  Create
                </Button>
              </Row>
            </FormGroup>
          </form>
        </Col>
      </div>
    )
  }
}

const SongEditorWithRouter = withRouter(SongEditor)
export default SongEditorWithRouter
