const
  { resolve } = require('path'),
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(resolve(__dirname, 'src', 'dist', 'spa')))
app.listen(port)
