const express = require('express')
const  bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./routes')
const constants = require('./utils/constants')
const app = express()

const corsOptions = {
  origin: (origin, callback) => {
    if (constants.CORS_WHITE_LIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/', routes)

app.listen(process.env.API_PORT, function () {
  console.log('CORS-enabled web server listening on port 5000')
})