import * as React from 'react'
import styled from 'styled-components'

const AutoscrollerControls = styled.div`
  position: fixed;
  margin-left: 88%;
  z-index: 1;
`

export class Autoscroller extends React.Component {
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
      <AutoscrollerControls>
        <button onClick={() => this.setScrollRate(35, 100)}>Slow</button>
        <button onClick={() => this.setScrollRate(100, 20)}>Fast</button>
        <button onClick={() => this.cancel()}>Stop</button>
      </AutoscrollerControls>
    )
  }
}
