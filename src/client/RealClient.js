import Client from './Client';

class RealClient extends Client {

    constructor (baseUri) {
        super();

        Object.assign(this, { baseUri });

        console.info('Using real client.');
        console.info(`Base URI: ${baseUri}`);
    }

    static checkResponseStatus (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return Promise.reject(Error(`Unexpected status code: ${response.status}`));
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
            .then(RealClient.checkResponseStatus)
            .then(json => json.id);
    }

    getSong (id) {
        return fetch(`${this.baseUri}/songs/${id}`, {
            mode: 'cors',
        })
            .then(RealClient.checkResponseStatus);
    }
}

export default RealClient;
