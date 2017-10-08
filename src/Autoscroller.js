import React, { Component } from 'react';
import Scroll from 'react-scroll';

class Autoscroller extends Component {
    cancel () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setScrollRate (pixelsPerSecond, intervalMillis) {
        const pixelsPerStep = pixelsPerSecond / 1000. * intervalMillis;

        this.cancel();

        this.interval = setInterval(() => {
            console.log(pixelsPerStep)
            window.scrollBy(0, pixelsPerStep);
        }, intervalMillis);
    }

    render () {
        return (
            <div className="autoscroller">
                <button onClick={ () => this.setScrollRate(35, 100.) }>Slow</button>
                <button onClick={ () => this.setScrollRate(100, 20.) }>Fast</button>
                <button onClick={ () => this.cancel() }>Stop</button>
            </div>
        );
    }
}

export default Autoscroller;
