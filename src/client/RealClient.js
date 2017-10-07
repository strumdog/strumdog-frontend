import Client from './Client';

class RealClient extends Client {

    constructor (baseUri) {
        super();

        Object.assign(this, { baseUri });

        console.info('Using real client.');
        console.info(`Base URI: ${baseUri}`);
    }

    static checkResponseStatus (response) {
        if (response.statusCode === 200) {
            return response.json();
        } else {
            return Promise.reject(Error(`Unexpected status code: ${response.statusCode}`));
        }
    }

    createSong (title, lyrics, chords) {
        const data = { title, lyrics, chords };

        return fetch(`${this.baseUri}/song`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(RealClient.checkResponseStatus)
            .then(json => json.id);
    }

    getSong (id) {
        return fetch(`${this.baseUri}/song`, {
            mode: 'cors',
        })
            .then(RealClient.checkResponseStatus);
    }
}

export default RealClient;
