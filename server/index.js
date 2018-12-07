import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import config from '../app-config'
// import logger from './logger'
import pkg from '../package.json'
import api from './api/api'


// CONFIG & ENVIRONMENT
const env = process.env.NODE_ENV || 'dev'
// const isProduction = env === 'production'
const PORT = process.env.PORT || config.ports.http

// INITIALIZE APP SERVER
console.log(`initializing ${pkg.description} server in ${env} mode...`)
export const app = express()

app.use(helmet())
app.use(helmet.noCache())

// ENABLE CORS
app.use(cors())

// ENABLE GZIP COMPRESSION
app.use(compression())

// ENABLED FORM BODY PARSING
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}))

// ENABLE OUTPUT LOGGING
app.use(morgan('dev'))

// ENABLE LOGGING AND CACHE CONTROL
// app.use(logger)

app.use('/api', api)

app.get('/version', (req, res) => {
  const { name, version, description } = pkg
  const { title } = config
  res.json({ name, title, description, version, deployed: new Date() })
})


export const httpServer = app.listen(PORT, () => {
  setTimeout(() => { app.emit('app_started') }, 300)
})

export default null
