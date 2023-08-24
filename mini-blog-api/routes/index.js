const express = require('express')
const router = express.Router()
const routeValidator = require('express-route-validator')
const responseBody = require('../utils/responseBody')

const Router = require('./v1')
router.use('/api', Router)

routeValidator.set('errorHandler', (err, req, res, next) => {
  return responseBody.badRequest(res, err, err.message)
})

module.exports = router