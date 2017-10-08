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
                // Create SongViewer component using router w/ id and client
            }).catch(e => {
                alert(e.message);
                console.error(e);
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
};

export default SongEditor;
