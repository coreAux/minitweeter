const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const routes = require('@util/routes')
const errorMiddleware = require('@middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.COOKIE_SECRET || 'secret',
}))

app.use(routes)

app.use(errorMiddleware)

module.exports = app
