// Type definitions for react-chord-parser 0.3.0
// Project: https://github.com/kyryloz/react-chord-parser
// Definitions by: Paul Melnikow <https://github.com/paulmelnikow>
// Definitions: https://github.com/kyryloz/react-chord-parser
// TypeScript Version: 2.9

declare module 'react-chord-parser' {
  import * as React from 'react'

  // e.g. 'Em'
  export type ChordName = string
  // e.g. '022000'
  export type DiagramString = string

  export type ChordNameFormatter = (chord: ChordName) => string

  export class Parser {
    public readonly input: string
    constructor(input: string)
    all(): ChordName[]
    unique(): ChordName[]
    wrap(callback: ChordNameFormatter): string
  }

  export interface ChordProps {
    name: ChordName
    diagram: DiagramString
    style?: object
  }

  export class Chord extends React.Component<ChordProps> {}
}
