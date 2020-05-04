function errorResponse(code, message, errors) {
  if (!errors) {
    errors = { message: message };
  }

  return {
    code: code,
    message: message,
    errors: [errors]
  };
}

function successResponse(code) {}

module.exports = { errorResponse };
