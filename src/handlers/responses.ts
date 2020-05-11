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

export const entityResponse = (entity: any, code?: number) => {
  return {
    code: code || 200,
    data: {
      [entity.type]: entity
    }
  };
};

//export function arrayResponse(code: number, array: []) {}
