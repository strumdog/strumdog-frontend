import * as React from 'react'
import { Parser, Chord } from 'react-chord-parser'
import { fingeringForChord } from './chord-map'
import groupBy from 'lodash.groupby'
import './SongViewer.css'
import Autoscroller from './Autoscroller'
import {
  IPositionedChord1D,
  IPositionedChord,
  ISongEntity,
  SongId,
  IClient,
} from './client/client'

export interface IMatchParams {
  id: SongId
}

export interface IProps extends IMatchParams {
  client: IClient
  errorManager: any
}

interface IState {
  title: string
  lyrics: string[]
  chords: IPositionedChord[]
  uniqueChords: any[]
}

interface IChordGroup {
  lyrics: string
  chords: IPositionedChord[]
}

class SongViewer extends React.Component<IProps> {
  state = {
    title: '',
    lyrics: [],
    chords: [],
    uniqueChords: [],
  } as IState

  componentDidMount() {
    this.getSongAndChords(this.props)
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.getSongAndChords(nextProps)
  }

  getSongAndChords(props: IProps) {
    const { id, client, errorManager } = props

    client
      .getSong(id)
      .then((song: ISongEntity) => {
        const chordsString = song.chords.map(info => info.chord).join(' ')
        this.setState({
          title: song.title,
          lyrics: song.lyrics,
          chords: song.chords,
          uniqueChords: new Parser(chordsString).unique(),
        })
      })
      .catch((e: any) => {
        errorManager.addError(e)
      })
  }

  static groupLyricLines(
    lyrics: string[],
    chords: IPositionedChord[]
  ): IChordGroup[] {
    const groupedChords = groupBy(chords, info => info.line - 1)

    const result = []

    for (let i = 0; i < lyrics.length; ++i) {
      result.push({
        lyrics: lyrics[i],
        chords: groupedChords[i] || [],
      })
    }

    return result
  }

  renderChordContainer(chords: IPositionedChord1D[]): JSX.Element {
    const pointSize = 36
    const characterWidth =
      0.6 /* Roboto Mono height to width ratio */ * pointSize

    const chordStyle = (left: number) => ({
      left:
        characterWidth * (left - 1) - 18 /* about the left margin of the tab */,
      position: 'absolute',
      width: 75,
      height: 85,
    })

    return (
      <div className="chordContainer">
        {chords.map((chord, i) => (
          <Chord
            key={i}
            style={chordStyle(chord.position)}
            name={chord.chord}
            diagram={fingeringForChord(chord.chord)}
          />
        ))}
      </div>
    )
  }

  renderLyricLine(
    { lyrics, chords }: IChordGroup,
    key: React.Key
  ): JSX.Element {
    // If a line has only chords, space them out a bit. This allows lines
    // like this to work correctly:
    // C Am F G
    let positionedChords
    if (!lyrics) {
      positionedChords = chords.map(chord => ({
        chord: chord.chord,
        position: 1.4 /* A little extra space */ * (chord.position - 1) + 1,
      }))
    } else {
      positionedChords = chords
    }

    return (
      <div className="lyricLine" key={key}>
        {this.renderChordContainer(positionedChords)}
        <div className="lyric">{lyrics}</div>
      </div>
    )
  }

  render() {
    const lyricLines = SongViewer.groupLyricLines(
      this.state.lyrics,
      this.state.chords
    )

    return (
      <div>
        <Autoscroller />
        <h1>{this.state.title}</h1>
        {lyricLines.map((line, i) => this.renderLyricLine(line, i))}
      </div>
    )
  }
}

export default SongViewer
