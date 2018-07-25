import { IClient, ISongData, SongId, ISongEntity } from './client'
import IdSequence from './id-sequence'

class MockClient implements IClient {
  private idSequence = new IdSequence()
  private storage = new Map()

  constructor() {
    console.info('Using mock client')
  }

  async createSong({ title, lyrics, chords }: ISongData): Promise<SongId> {
    const id = this.idSequence.getNext().toString()

    this.storage.set(id, { title, lyrics, chords })

    return id
  }

  async getSong(id: SongId): Promise<ISongEntity> {
    if (this.storage.has(id)) {
      return this.storage.get(id)
    } else {
      throw Error(`No such song: ${id}`)
    }
  }

  async cleanLyrics(lyrics: string): Promise<string> {
    return lyrics
  }
}

export default MockClient
