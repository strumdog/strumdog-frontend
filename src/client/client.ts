export type ChordName = string

export interface IPositionedChord1D {
  chord: ChordName
  position: number
}

export interface IPositionedChord extends IPositionedChord1D {
  line: number
}

export type SongId = string

export interface ISongData {
  title: string
  lyrics: string[]
  chords: IPositionedChord[]
}

export interface ISongEntity extends ISongData {
  id: SongId
}

export interface IClient {
  createSong(data: ISongData): Promise<SongId>
  getSong(id: SongId): Promise<ISongEntity>
  cleanLyrics(lyrics: string): Promise<string>
}
