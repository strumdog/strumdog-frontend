import * as React from 'react'
import { useState, useEffect } from 'react'

export interface IError {
  message: string
}

export interface IProps {
  manager: any
}

export function Errors({ manager }: { manager: any }) {
  const [errors, setErrors] = useState<IError[]>([])

  useEffect(() => {
    manager.on('added', () => {
      setErrors(manager.getErrors())
    })
  }, [manager])

  return (
    <ul>
      {errors.map((e, i) => (
        <li key={i}>{e.message}</li>
      ))}
    </ul>
  )
}
