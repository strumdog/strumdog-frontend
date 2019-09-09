import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Chord } from 'react-chord-parser'
import groupBy from 'lodash.groupby'
import { fingeringForChord } from '../../chords/chord-map'
import {
  IPositionedChord1D,
  IPositionedChord,
  ISongEntity,
  SongId,
  IClient,
} from '../../client/client'
import { Autoscroller } from './autoscroller'

const LyricLine = styled.div`
  position: relative;
  margin: 36px;
`

const ChordContainer = styled.div`
  height: 88px;
`

const LyricContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  clear: both;
  text-align: left;
  font-size: 36px;
  white-space: nowrap;
`

export interface IMatchParams {
  id: SongId
}

export interface IProps extends IMatchParams {
  client: IClient
  errorManager: any
}

interface IChordGroup {
  lyrics: string
  chords: IPositionedChord[]
}

function groupLyricLines(
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

export function SongViewer({ id, client, errorManager }: IProps) {
  const [title, setTitle] = useState('')
  const [lyrics, setLyrics] = useState<string[]>([])
  const [chords, setChords] = useState<IPositionedChord[]>([])
  // const [uniqueChords, setUniqueChords] = useState<string[]>([])

  useEffect(() => {
    client
      .getSong(id)
      .then(({ title, lyrics, chords }: ISongEntity) => {
        setTitle(title)
        setLyrics(lyrics)
        setChords(chords)

        // const chordString = chords.map(info => info.chord).join(' ')
        // setUniqueChords(new Parser(chordString).unique())
      })
      .catch((e: any) => {
        errorManager.addError(e)
      })
  }, [id, client, errorManager])

  function renderChordContainer(chords: IPositionedChord1D[]): JSX.Element {
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
      <ChordContainer>
        {chords.map((chord, i) => (
          <Chord
            key={i}
            style={chordStyle(chord.position)}
            name={chord.chord}
            diagram={fingeringForChord(chord.chord)}
          />
        ))}
      </ChordContainer>
    )
  }

  function renderLyricLine(
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
      <LyricLine key={key}>
        {renderChordContainer(positionedChords)}
        <LyricContainer>{lyrics}</LyricContainer>
      </LyricLine>
    )
  }
  const lyricLines = groupLyricLines(lyrics, chords)

  return (
    <div>
      <Autoscroller />
      <h1>{title}</h1>
      {lyricLines.map((line, i) => renderLyricLine(line, i))}
    </div>
  )
}
