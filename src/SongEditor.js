import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseInputText } from './chordParser.js'

class SongEditor extends Component {

    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handleUpdate() {
        const songText = this.songTextInput.value;

        const parsed = parseInputText(songText);

        const song = {
            title: 'My Amazing Song',
            lyrics: parsed.lyrics,
            chords: parsed.chords,
        };

        this.props.client.createSong(song.title, song.lyrics, song.chords)
            .then(id => {
                console.log(`Song created: ${id}`);
                this.context.router.history.push(`/song/${id}`);
            }).catch(e => {
                this.props.errorManager.addError(e);
            });
    }

    render() {
        return (
            <div>
                <textarea ref={ input => this.songTextInput = input } />
                <button onClick={ this.handleUpdate }>
                    Create
                </button>
            </div>
        )
    }
}

SongEditor.propTypes = {
    client: PropTypes.object.isRequired,
    errorManager: PropTypes.object.isRequired,
};

SongEditor.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default SongEditor;
