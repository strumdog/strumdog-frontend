import Client from './Client';

class RealClient extends Client {

    constructor (baseUri) {
        super();

        Object.assign(this, { baseUri });

        console.info('Using real client.');
        console.info(`Base URI: ${baseUri}`);
    }

    static checkResponseStatus (response, notFoundMessage) {
        notFoundMessage = notFoundMessage || 'Not found';

        if (response.status >= 500) {
            throw Error('An error occurred while contacting the server');
        } else if (response.status === 404) {
            throw Error(notFoundMessage);
        } else if (response.status >= 400) {
            throw Error('Something is wrong with the input you provided');
        } else {
            return response;
        }
    }

    createSong (title, lyrics, chords) {
        const data = { title, lyrics, chords };

        return fetch(`${this.baseUri}/songs`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.constructor.checkResponseStatus)
            .then(response => response.json())
            .then(json => json.id);
    }

    getSong (id) {
        return fetch(`${this.baseUri}/songs/${id}`, {
            mode: 'cors',
        })
            .then(response => this.constructor.checkResponseStatus(response, 'Song not found'))
            .then(response => response.json());
    }

    cleanLyrics (lyrics) {
        const data = { song_text: lyrics };

        return fetch(`${this.baseUri}/cleanup_text`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.constructor.checkResponseStatus)
            .then(response => response.json())
            .then(json => json.clenaed_text);
    }
}

export default RealClient;
