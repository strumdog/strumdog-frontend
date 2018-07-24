import React, { Component } from 'react'
import { Parser, Chord } from 'react-chord-parser'
import { fingeringForChord } from './chord-map'
import groupBy from 'lodash.groupby'
import './SongViewer.css'
import PropTypes from 'prop-types'
import Autoscroller from './Autoscroller'

class SongViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      lyrics: [],
      chords: [],
      uniqueChords: [],
    }
  }

  componentDidMount() {
    this.getSongAndChords(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.getSongAndChords(nextProps)
  }

  getSongAndChords(props) {
    const id = Number(props.match.params.id)

    props.client
      .getSong(id)
      .then(song => {
        const chordsString = song.chords.map(info => info.chord).join(' ')
        this.setState({
          title: song.title,
          lyrics: song.lyrics,
          chords: song.chords,
          uniqueChords: new Parser(chordsString).unique(),
        })
      })
      .catch(e => {
        props.errorManager.addError(e)
      })
  }

  static groupLyricLines(lyrics, chords) {
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

  renderChordContainer(chords) {
    const pointSize = 36
    const characterWidth =
      0.6 /* Roboto Mono height to width ratio */ * pointSize

    const chordStyle = left => ({
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

  renderLyricLine({ lyrics, chords }, key) {
    // If a line has only chords, space them out a bit. This allows lines
    // like this to work correctly:
    // C Am F G
    if (!lyrics) {
      chords = chords.map(chord => ({
        chord: chord.chord,
        position: 1.4 /* A little extra space */ * (chord.position - 1) + 1,
      }))
    }

    return (
      <div className="lyricLine" key={key}>
        {this.renderChordContainer(chords)}
        <div className="lyric">{lyrics}</div>
      </div>
    )
  }

  render() {
    const lyricLines = this.constructor.groupLyricLines(
      this.state.lyrics,
      this.state.chords
    )

    return (
      <div>
        <Autoscroller className="autoscroller" />
        <h1>{this.state.title}</h1>
        {lyricLines.map((line, i) => this.renderLyricLine(line, i))}
      </div>
    )
  }
}

SongViewer.propTypes = {
  client: PropTypes.object.isRequired,
  errorManager: PropTypes.object.isRequired,
}

export default SongViewer
