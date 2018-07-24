/* eslint-disable no-undef */

export interface IConfig {
  mock: boolean
  baseUri?: string
}

const config = (() : IConfig => {
  if (process.env.REACT_APP_BASE_URI) {
    return {
      mock: false,
      baseUri: process.env.REACT_APP_BASE_URI,
    }
  } else {
    return {
      mock: true,
    }
  }
})()

export default config
