const ee = require('event-emitter');

class ErrorManager {
    constructor () {
        this._errors = [];
    }

    addError (error) {
        this._errors.push(error);
        this.emit('added', error);
    }

    getErrors () {
        return this._errors.slice();
    }
}

ee(ErrorManager.prototype);

export default ErrorManager;
