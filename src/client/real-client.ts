import { IClient, ISongData, SongId, ISongEntity } from './client'

export default class RealClient implements IClient {
  constructor(private baseUri: string) {
    console.info('Using real client.')
    console.info(`Base URI: ${baseUri}`)
  }

  static checkResponseStatus(
    response: Response,
    notFoundMessage = 'Not found'
  ) {
    if (response.status >= 500) {
      throw Error('An error occurred while contacting the server')
    } else if (response.status === 404) {
      throw Error(notFoundMessage)
    } else if (response.status >= 400) {
      throw Error('Something is wrong with the input you provided')
    } else {
      return response
    }
  }

  async createSong({ title, lyrics, chords }: ISongData): Promise<SongId> {
    const data = { title, lyrics, chords }

    const response = await fetch(`${this.baseUri}/songs`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    RealClient.checkResponseStatus(response)

    const { id } = await response.json()
    return id
  }

  async getSong(id: SongId): Promise<ISongEntity> {
    const response = await fetch(`${this.baseUri}/songs/${id}`, {
      mode: 'cors',
    })

    RealClient.checkResponseStatus(response, 'Song not found')

    return response.json()
  }

  async cleanLyrics(lyrics: string): Promise<string> {
    const data = { song_text: lyrics }

    const response = await fetch(`${this.baseUri}/songs/cleanup_text`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    RealClient.checkResponseStatus(response)

    const { cleaned_text } = await response.json()
    return cleaned_text
  }
}
