import React, { Component } from 'react';
import { Parser, Chord } from 'react-chord-parser';
import PropTypes from 'prop-types';
import { fingeringForChord } from './chordMap';

class SongViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lyrics: [],
            chords: [],
            uniqueChords: [],
        };
    }

    componentDidMount() {
        getSongAndChords(this.props);
    }

    componentWillRecieveProps(nextProps) {
        getSongAndChords(nextProps)
    }

    getSongAndChords(props) {

        props.client.getSong(props.id)
            .then(song => {
                this.state.title  = song.title;
                this.state.lyrics = song.lyrics;
                this.state.chords = song.chords;
                this.state.uniqueChords = new Parser(song.chords).unique();
            }).catch(e => {
                alert(e.message);
                console.error(e);
            })

        return this.state.uniqueChords.map(chord => (
            <Chord
                key={ chord }
                name={ chord }
                diagram={ fingeringForChord(chord) }/>
        ));
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                { this.state.uniqueChords.map(chord => (
                        <Chord
                            key={ chord }
                            name={ chord }
                            diagram={ fingeringForChord(chord) }/>
                ));}
            </div>
        )
    }
}

export default SongViewer;
