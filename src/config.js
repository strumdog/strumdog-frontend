const config = {}

if (process.env.REACT_APP_BASE_URI) {
  Object.assign(config, {
    mock: false,
    baseUri: process.env.REACT_APP_BASE_URI,
  })
} else {
  Object.assign(config, {
    mock: true,
  })
}

export default config
