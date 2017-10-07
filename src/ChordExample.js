import React, { Component } from 'react';
import {Parser, Chord, Chordify} from "react-chord-parser";
 
const input = [
    'G                D                   ',
    'When I find myself in times of trouble,',
    '  Em       C                           ',
    'Mother Mary comes to me,               ',
    '  G              D       C          G  ',
    'Speaking words of wisdom, let it be.',
];
 
const parser = new Parser(input);
 
// Return an array of unique chords found in the string 
const uniques = parser.unique(); // => ["C", "D", "Em", "G"]; 
 
// If you want to exclude word from parsing  
// just precede it with "\" character, e.g. "What \A Day" 
 
class MyComponent extends Component {
 
    diagramSupplier = (chord) => {
        switch (chord) {
            case "C":
                return "x32010";
            case "D":
                return "xx0232";
            case "Em":
                return "022000";
            case "G":
                return "320033";
            default:
                return "xxxxxx";
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
            <Chordify color="#aa4444" input={input}/>
        )
    }
}

export default MyComponent;
