import * as React from 'react'

export default class Autoscroller extends React.Component {
  // eslint-disable-next-line no-undef
  private interval?: number

  private cancel() {
    if (this.interval) {
      window.clearInterval(this.interval)
      this.interval = undefined
    }
  }

  private setScrollRate(pixelsPerSecond: number, intervalMillis: number) {
    const pixelsPerStep = (pixelsPerSecond / 1000) * intervalMillis

    this.cancel()

    this.interval = window.setInterval(() => {
      console.log(pixelsPerStep)
      window.scrollBy(0, pixelsPerStep)
    }, intervalMillis)
  }

  render() {
    return (
      <div className="autoscroller">
        <button onClick={() => this.setScrollRate(35, 100)}>Slow</button>
        <button onClick={() => this.setScrollRate(100, 20)}>Fast</button>
        <button onClick={() => this.cancel()}>Stop</button>
      </div>
    )
  }
}
