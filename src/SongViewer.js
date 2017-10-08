import React, { Component } from 'react';
import { Parser, Chord } from 'react-chord-parser';
import { fingeringForChord } from './chordMap';

class SongViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            lyrics: [],
            chords: [],
            uniqueChords: [],
        };
    }

    componentDidMount() {
        this.getSongAndChords(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getSongAndChords(nextProps)
    }

    getSongAndChords(props) {

        props.client.getSong(Number(props.id))
            .then(song => {
                console.log(JSON.stringify(song));
                const chordsString = song.chords.map(info => info.chord).join(' ');
                this.setState({
                    title: song.title,
                    lyrics: song.lyrics,
                    chords: song.chords,
                    uniqueChords: new Parser(chordsString).unique()
                });
            }).catch(e => {
                alert(e.message);
                console.error(e);
            })

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
                ))}
            </div>
        )
    }
}

export default SongViewer;
