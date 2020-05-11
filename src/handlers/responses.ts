export const errorResponse = (code: number, message: string, errors?: any) => {
  if (!errors) {
    errors = { message: message };
  }

  return {
    code: code,
    message: message,
    errors: [errors]
  };
};

export const entityResponse = (code: number, entity: any) => {
  return {
    code: code,
    [entity.type]: entity
  };
};

//export function arrayResponse(code: number, array: []) {}
