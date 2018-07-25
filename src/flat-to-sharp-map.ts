export function mapFlatToSharp(chord: string): string {
  const flats = {
    Bb: 'A#',
    Bb7: 'A#7',
    Bbm: 'A#m',
    Bbdim: 'A#dim',
    Bbaug: 'A#aug',
    Bbm7: 'A#m7',
    Bbmaj7: 'A#maj7',
    Bb6: 'A#6',
    Bbm6: 'A#m6',
    Bb9: 'A#9',
    Bbsus: 'A#sus',
    Bb7sus: 'A#7sus',

    Db: 'C#',
    Db7: 'C#7',
    Dbm: 'C#m',
    Dbdim: 'C#dim',
    Dbaug: 'C#aug',
    Dbm7: 'C#m7',
    Dbmaj7: 'C#maj7',
    Db6: 'C#6',
    Dbm6: 'C#m6',
    Db9: 'C#9',
    Dbsus: 'C#sus',
    Db7sus: 'C#7sus',

    Eb: 'D#',
    Eb7: 'D#7',
    Ebm: 'D#m',
    Ebdim: 'D#dim',
    Ebaug: 'D#aug',
    Ebm7: 'D#m7',
    Ebmaj7: 'D#maj7',
    Eb6: 'D#6',
    Ebm6: 'D#m6',
    Eb9: 'D#9',
    Ebsus: 'D#sus',
    Eb7sus: 'D#7sus',

    Gb: 'F#',
    Gb7: 'F#7',
    Gbm: 'F#m',
    Gbdim: 'F#dim',
    Gbaug: 'F#aug',
    Gbm7: 'F#m7',
    Gbmaj7: 'F#maj7',
    Gb6: 'F#6',
    Gbm6: 'F#m6',
    Gb9: 'F#9',
    Gbsus: 'F#sus',
    Gb7sus: 'F#7sus',

    Ab: 'G#',
    Ab7: 'G#7',
    Abm: 'G#m',
    Abdim: 'G#dim',
    Abaug: 'G#aug',
    Abm7: 'G#m7',
    Abmaj7: 'G#maj7',
    Ab6: 'G#6',
    Abm6: 'G#m6',
    Ab9: 'G#9',
    Absus: 'G#sus',
    Ab7sus: 'G#7sus',
  }
  const sharp = flats[chord]
  if (sharp) {
    return sharp
  }
  // returning original chord instead.
  // Error will be caught at chordMap.js.
  return chord
}
