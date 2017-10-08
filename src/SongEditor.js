import React, { Component } from 'react';
import { Parser, Chord } from 'react-chord-parser';
import PropTypes from 'prop-types';
import { flatToSharp } from './flatToSharpMap';
import { fingeringForChord } from './chordMap';

class SongEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            songText: '',
            uniqueChords: [],
        };

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    renderUniqueChords() {
        return this.state.uniqueChords.map(chord => (
            <Chord
                key={ chord }
                name={ chord }
                diagram={ flatToSharp( fingeringForChord(chord) ) }/>
        ));
    }

    handleUpdate() {
        const songText = this.songTextInput.value;
        const parser = new Parser(songText);
        const uniqueChords = parser.unique();

        const song = {
            songText,
            title: 'My Amazing Song',
        };

        this.props.client.createSong(song)
            .then(id => {
                console.log(`Song created: ${id}`);
                this.setState({ songText, uniqueChords });
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
                    Update
                </button>
                { this.renderUniqueChords() }
            </div>
        )
    }
}

SongEditor.propTypes = {
    client: PropTypes.object.isRequired,
};

export default SongEditor;
