import Client from './Client';
import IdSequence from './IdSequence';

class MockClient extends Client {

    constructor () {
        super();

        this.idSequence = new IdSequence();
        this.storage = new Map();

        console.info('Using mock client');
    }

    createSong (title, lyrics, chords) {
        const id = this.idSequence.getNext();

        this.storage.set(id, { title, lyrics, chords });

        return Promise.resolve(id);
    }

    getSong (id) {
        if (this.storage.has(id)) {
            return Promise.resolve(this.storage.get(id));
        } else {
            return Promise.reject(Error(`No such song: ${id}`));
        }
    }

    cleanLyrics (lyrics) {
        return Promise.resolve(lyrics);
    }
}

export default MockClient;
