import React, { Component } from 'react';
import {Parser, Chord, Chordify} from "react-chord-parser";
 
const input = [
    'G                D                   ',
    'When I find myself in times of trouble,',
    '  Em       C                           ',
    'Mother Mary comes to me,               ',
    '  G              D       C          G  ',
    'Speaking words of wisdom, let it be.',
].join('\n');
 
const parser = new Parser(input);
 
// Return an array of unique chords found in the string 
const uniques = parser.unique(); // => ["C", "D", "Em", "G"]; 
 
// If you want to exclude word from parsing  
// just precede it with "\" character, e.g. "What \A Day" 
 
class ChordExample extends Component {
 
    diagramSupplier = (chord) => {
        switch (chord) {
            case "C":
                return "xxx3";
            case "D":
                return "2225";
            case "Em":
                return "x432";
            case "G":
                return "x232";
            default:
                return "xxxx";
        }
    };
    
    // this will render all unique chords from the input as vector image 
    renderUniqueChords() {
        return uniques.map(chord => <Chord 
                                        key={chord} 
                                        name={chord} 
                                        diagram={this.diagramSupplier(chord)}/>);
    }
    
    render() {
        return (
            // Just emphasize chords found in the input with some color. 
            // You can be sure that input text properly sanitized, 
            // actually no html tags are allowed, if any – they will be deleted. 
            // You can get more control using parser.wrap(callback) method 
            // <Chordify color="#aa4444" input={input}/>
            this.renderUniqueChords()
        )
    }
}

export default ChordExample;
