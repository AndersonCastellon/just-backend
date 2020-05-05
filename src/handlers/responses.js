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

function entityResponse(code, entity) {
  return {
    code: code,
    [entity.type]: entity
  };
}

function arrayResponse(code, array) {}

module.exports = { errorResponse, entityResponse, arrayResponse };
