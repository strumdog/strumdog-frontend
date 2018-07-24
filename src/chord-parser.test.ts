import { parseInputText } from './chord-parser'

it('parses input text', () => {
  const testInput = [
    'G                D                   ',
    'When I find myself in times of trouble,',
    '  Em       C                           ',
    'Mother Mary comes to me,               ',
    '  G              D       C          G  ',
    'Speaking words of wisdom, let it be.',
  ].join('\n')

  const expected = {
    lyrics: [
      'When I find myself in times of trouble,',
      'Mother Mary comes to me,',
      'Speaking words of wisdom, let it be.',
    ],
    chords: [
      { chord: 'G', line: 1, position: 1 },
      { chord: 'D', line: 1, position: 18 },
      { chord: 'Em', line: 2, position: 3 },
      { chord: 'C', line: 2, position: 12 },
      { chord: 'G', line: 3, position: 3 },
      { chord: 'D', line: 3, position: 18 },
      { chord: 'C', line: 3, position: 26 },
      { chord: 'G', line: 3, position: 37 },
    ],
  }

  expect(parseInputText(testInput)).toEqual(expected)
})
