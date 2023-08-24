const sendResponse = (res, statusCode = 200, body = null, error = null, message = null) => {
  const response = {}
  response.result = [200, 201, 202, 204, 304].includes(statusCode) ? 'success' : 'error'
  if (response.result === 'success') {
    response.json = body
  } else if (response.result === 'error') {
    response.error = {
      statusCode,
      message,
      error: error || null
    }
    // ! DEPRECATED: Remove below payload in Dec 2021
    response.err = {
      message: message
    }
    response.err_message = message
  }
  return res.status(statusCode).json(response)
}

exports.ok = (res, body) => sendResponse(res, 200, body)
exports.created = (res, body) => sendResponse(res, 201, body)
exports.accepted = (res, body) => sendResponse(res, 202, body)
exports.noContent = (res, body) => sendResponse(res, 204, body)
exports.notModified = (res, body) => sendResponse(res, 304, body)
exports.badRequest = (res, error, errorMessage) => sendResponse(res, 400, null, error, errorMessage)
exports.unauthorized = (res, error, errorMessage) => sendResponse(res, 401, null, error, errorMessage)
exports.forbidden = (res, error, errorMessage) => sendResponse(res, 403, null, error, errorMessage)
exports.notFound = (res, error = null, errorMessage = null) => sendResponse(res, 404, null, error, errorMessage)
exports.gone = (res, error = null, errorMessage = null) => sendResponse(res, 410, null, error, errorMessage)
exports.internalServerError = (res, error = null, errorMessage = null) => sendResponse(res, 500, null, error, errorMessage)
