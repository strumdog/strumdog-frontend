import React, { Component } from 'react';
import { Parser, Chord } from 'react-chord-parser';
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
                diagram={ fingeringForChord(chord) }/>
        ));
    }

    handleUpdate() {
        const songText = this.songTextInput.value;
        const parser = new Parser(songText);
        const uniqueChords = parser.unique();

        this.setState({ songText, uniqueChords });
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

export default SongEditor;
