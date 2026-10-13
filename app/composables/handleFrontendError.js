'use strict';

export const handleFrontendError = (error, message) => {
  $fetch('/monitoring/save-log', {
    method: 'POST',
    body: {
      content: JSON.stringify({
        error,
        message,
      }),
    },
  });

  throw createError({
    statusCode: 500,
    statusMessage: message ?? 'Internal Server Error',
    message: message ?? error?.message ?? 'An unexpected error occurred',
    fatal: true,
  });
};
