import * as React from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import {
  Button,
  FormGroup,
  FormControl,
  Row,
  Col,
  ControlLabel,
  Checkbox,
} from 'react-bootstrap'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { parseInputText } from '../../chords/chord-parser'
import { IClient } from '../../client/client'

const EditorContainer = styled.div`
  .btn {
    margin: 20px;
  }

  .control-label {
    margin-top: 10px;
  }
`

interface IProps extends RouteComponentProps<{}> {
  client: IClient
  errorManager: any
}

function _SongCreator({ client, errorManager, history }: IProps) {
  const titleTextInput = useRef<HTMLInputElement>()
  const songTextInput = useRef<HTMLInputElement>()
  const lyricsCleanerChecked = useRef<HTMLInputElement>()

  async function maybeClean(lyrics: string, shouldClean: boolean) {
    if (shouldClean) {
      return client.cleanLyrics(lyrics)
    } else {
      return lyrics
    }
  }

  async function handleUpdate() {
    const title = titleTextInput.current ? titleTextInput.current.value : ''
    const songText = songTextInput.current ? songTextInput.current.value : ''
    const wantsLyricsCleaned =
      lyricsCleanerChecked.current &&
      lyricsCleanerChecked.current.value === 'on'
        ? true
        : false

    const cleaned = await maybeClean(songText, wantsLyricsCleaned)
    const { lyrics, chords } = parseInputText(cleaned)

    let id
    try {
      id = await client.createSong({ title, lyrics, chords })
    } catch (e) {
      errorManager.addError(e)
      return
    }

    console.log(`Song created: ${id}`)
    history.push(`/song/${id}`)
  }

  return (
    <EditorContainer>
      <Col xs={6} xsOffset={3}>
        <h4>Copy your chord tab into the box below.</h4>
        <form>
          <FormGroup>
            <ControlLabel className="pull-left">Song title</ControlLabel>
            <FormControl
              componentClass="input"
              inputRef={ref => (titleTextInput.current = ref)}
            />
            <ControlLabel className="pull-left">Chord tab</ControlLabel>
            <FormControl
              componentClass="textarea"
              style={{ fontFamily: 'monospace' }}
              inputRef={ref => (songTextInput.current = ref)}
            />
            <Row>
              <Checkbox
                inline
                inputRef={ref => (lyricsCleanerChecked.current = ref)}
              >
                Use lyrics cleaner
              </Checkbox>
              <Button bsStyle="primary" bsSize="lg" onClick={handleUpdate}>
                Create
              </Button>
            </Row>
          </FormGroup>
        </form>
      </Col>
    </EditorContainer>
  )
}

export const SongCreator = withRouter(_SongCreator)
