import express, { Express, Request } from 'express'
import * as bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { gqlServer } from './graphql/graphql'
const morgan = require('morgan')
import path from 'path'
import jwt from 'express-jwt'
import cors from 'cors'
import router from './routes/routes'

require('dotenv').config()
const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true)
    }
  })
)

morgan.token('graphql-query', (req: Request) => {
  const { variables } = req.body

  return `GRAPHQL ${
    Object.keys(variables || {}).length
      ? `Variables: ${JSON.stringify(variables)}`
      : ''
  }`
})
app.use(morgan(':method :status :response-time ms :graphql-query'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.DB_CONNECT || '', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', () => {
  console.log('Mongo Connected')
})

if (!process.env.PRIVATE) {
  throw new Error('Private env key not set')
}
const auth = jwt({
  secret: process.env.PRIVATE,
  credentialsRequired: false
})

app.use(auth)
app.use(router)

gqlServer.applyMiddleware({
  app,
  path: '/graphql',
  cors: false
})

app.use(express.static(path.join(__dirname, '/../../client/build')))

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../client/public/index.html'))
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../client/build/index.html'))
})
*/

export default app
