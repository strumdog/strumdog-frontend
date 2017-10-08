import React, { Component } from 'react';
import { Parser, Chord } from 'react-chord-parser';
import { fingeringForChord } from './chordMap';
import groupBy from 'lodash.groupby';
import './SongViewer.css';

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
        const id = Number(props.match.params.id);

        props.client.getSong(id)
            .then(song => {
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

    static groupedLines (lyrics, chords) {
        const groupedChords = groupBy(chords, info => info.line - 1);

        const result = [];

        for (let i = 0; i < lyrics.length; ++i) {
            result.push({
                lyrics: lyrics[i],
                chords: groupedChords[i] || [],
            });
        }

        return result;
    }

    renderChordContainer (chords) {
        const pointSize = 36;
        const characterWidth = 0.6 /* Roboto Mono height to width ratio */ * pointSize;

        const chordStyle = left => ({
            left: characterWidth * (left - 1) - 18 /* about the left margin of the tab */,
            position: 'absolute',
            width: 75,
            height: 85,
        });

        return (
            <div className="chordContainer">
                { chords.map((chord, i) => (
                    <Chord
                        key={ i }
                        style={ chordStyle(chord.position) }
                        name={ chord.chord }
                        diagram={ fingeringForChord(chord.chord) }/>
                )) }
            </div>
        );
    }

    render() {
        const groupedLines = this.constructor.groupedLines(this.state.lyrics, this.state.chords);

        return (
            <div>
                <h1>{this.state.title}</h1>
                { groupedLines.map((line, i) => (
                    <div className="lyricLine" key={ i }>
                        { this.renderChordContainer(line.chords) }
                        <div className="lyric">{ line.lyrics }</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default SongViewer;
