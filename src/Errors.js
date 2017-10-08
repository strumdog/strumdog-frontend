import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Errors extends Component {
    constructor (props) {
        super(props);

        props.manager.on('added', () => this.forceUpdate());
    }

    render () {
        return (
            <ul>
                { this.props.manager.getErrors().map(e => (
                    <li>{ e.message }</li>
                ))}
            </ul>
        );
    }
}

Errors.propTypes = {
    manager: PropTypes.object.isRequired,
};

export default Errors;
