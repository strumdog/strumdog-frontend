const ee = require('event-emitter');

class ErrorManager {
    constructor () {
        this._errors = [];
    }

    addError (error) {
        this._errors.push(error);
        this.emit('added', error);
    }

    popErrors() {
        var E = [];
        var top = this._errors.length;
        for (var i = top - 1; i >= 0; i--) {
            E.push(this._errors.pop());
        }
        return E;
    }

    getErrors () {
        var err = this.popErrors();
        return err.slice();
    }
}

ee(ErrorManager.prototype);

export default ErrorManager;
