export const formatErrorResponse = (error: any): object => {
  const response: any = {
    message:
      error.name === 'ZodError'
        ? 'Validation failed'
        : error.message || 'An unexpected error occurred',
    success: false,
    error: {
      name: error.name || 'Error',
    },
    stack: error.stack || '', // Only define stack at the top level
  };

  if (error.name === 'ZodError') {
    response.error.errors = error.errors.reduce((acc: any, err: any) => {
      const path = err.path.join('.');
      acc[path] = {
        message: err.message,
        name: 'ValidatorError',
        properties: {
          message: err.message,
          type: err.code,
        },
        kind: err.code,
        path,
      };
      return acc;
    }, {});
  } else if (error.name === 'ValidationError') {
    response.error.errors = Object.keys(error.errors).reduce(
      (acc: any, key: string) => {
        const errDetail = error.errors[key];
        acc[key] = {
          message: errDetail.message,
          name: errDetail.name || 'ValidatorError',
          properties: {
            message: errDetail.properties?.message || errDetail.message,
            type: errDetail.properties?.type || 'unknown',
            ...(errDetail.properties || {}),
          },
          kind: errDetail.kind || 'unknown',
          path: key,
        };
        return acc;
      },
      {},
    );
  }
  return response;
};