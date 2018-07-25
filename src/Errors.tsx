/* eslint-disable no-undef */

import * as React from 'react'

export interface IError {
  message: string
}

export interface IProps {
  manager: any
}

export default class Errors extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)

    props.manager.on('added', () => this.forceUpdate())
  }

  render() {
    return (
      <ul>
        {(this.props.manager.getErrors() as IError[]).map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    )
  }
}
