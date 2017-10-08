import React, { Component } from 'react';
import Scroll from 'react-scroll';

class Autoscroller extends Component {
    cancel () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setScrollRate (pixelsPerSecond) {
        const intervalMillis = 100.;
        const pixelsPerStep = pixelsPerSecond / intervalMillis;

        this.cancel();

        this.interval = setInterval(() => {
            Scroll.animateScroll.scrollMore(pixelsPerStep);
        }, intervalMillis);
    }

    render () {
        return (
            <div className="autoscroller">
                <button onClick={ () => this.setScrollRate(10) }>Slow</button>
                <button onClick={ () => this.setScrollRate(50) }>Fast</button>
                <button onClick={ () => this.cancel() }>Stop</button>
            </div>
        );
    }
}

export default Autoscroller;

// function scrollToTop(scrollDuration) {
//     var scrollStep = -window.scrollY / (scrollDuration / 15),
//         scrollInterval = setInterval(function(){
//         if ( window.scrollY != 0 ) {
//             window.scrollBy( 0, scrollStep );
//         }
//         else clearInterval(scrollInterval); 
//     },15);
// }