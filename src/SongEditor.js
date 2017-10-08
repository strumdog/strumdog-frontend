import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseInputText } from './chordParser.js'
import { Button, FormGroup, FormControl, Row, Col, ControlLabel, Checkbox } from 'react-bootstrap';
import './SongEditor.css'

class SongEditor extends Component {

    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    maybeClean (lyrics, shouldClean) {
        if (shouldClean) {
            return this.props.client.cleanLyrics(lyrics);
        } else {
            return Promise.resolve(lyrics);
        }
    }

    handleUpdate() {

        const titleText = this.titleTextInput.value;
        const songText = this.songTextInput.value;
        const lyricsCleanerChecked = (this.lyricsCleanerChecked.value === "on" ? true : false);

        this.maybeClean(songText, lyricsCleanerChecked)
            .then(parseInputText)
            .then(parsed =>
                this.props.client.createSong(titleText, parsed.lyrics, parsed.chords)
                    .then(id => {
                        console.log(`Song created: ${id}`);
                        this.context.router.history.push(`/song/${id}`);
                    }))
            .catch(e => {
                this.props.errorManager.addError(e);
            });
    }

    render() {
        return (
            <div>
                <Col xs={6} xsOffset={3} >
                    <h4>Copy your chord tab into the box below.</h4>
                    <form>
                        <FormGroup>
                            <ControlLabel className="pull-left">Song title</ControlLabel>
                            <FormControl componentClass="input" inputRef= { titleTextInput => this.titleTextInput = titleTextInput } />
                            <ControlLabel className="pull-left">Chord tab</ControlLabel>
                            <FormControl componentClass="textarea" inputRef={ songTextInput => this.songTextInput = songTextInput } />
                            <Row>
                                <Checkbox inline inputRef={ ref => this.lyricsCleanerChecked = ref}>Use lyrics cleaner</Checkbox>
                                <Button bsStyle="primary" bsSize="lg" onClick={ this.handleUpdate }>
                                    Create
                                </Button>
                            </Row>
                        </FormGroup>
                    </form>
                </Col>
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
