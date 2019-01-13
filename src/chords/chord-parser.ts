import { TablatureString } from './chord-map'

const chordRegex = /((\\)?\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)/g

export interface IPositionedChord1D {
  chord: TablatureString
  position: number
}

export interface IPositionedChord2D extends IPositionedChord1D {
  line: number
}

export interface ParserResult {
  lyrics: string[]
  chords: IPositionedChord2D[]
}

export function parseLine(line: string): IPositionedChord1D[] {
  const result = []

  let match
  do {
    match = chordRegex.exec(line)
    if (match) {
      const info = { chord: match[0], position: match.index + 1 }
      result.push(info)
    }
  } while (match)

  return result
}

export function parseInputText(text: string): ParserResult {
  const lyrics = [] as string[]
  let chords = [] as IPositionedChord2D[]

  const inputLines = text.split('\n')

  for (let i = 0; i < inputLines.length; i += 2) {
    const chordLine = inputLines[i]
    const lyricLine = (inputLines[i + 1] || '').trim()

    lyrics.push(lyricLine)

    const parsedChords = parseLine(chordLine).map(info => ({
      chord: info.chord,
      line: i / 2 + 1,
      position: info.position,
    }))
    chords = chords.concat(parsedChords)
  }

  return { lyrics, chords }
}
