const chordRegex = /((\\)?\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)/g

export const parseLine = line => {
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

export const parseInputText = text => {
  const lyrics = []
  let chords = []

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
