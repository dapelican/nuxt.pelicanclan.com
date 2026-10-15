'use strict';

import {
  HTTP_CODE_400_BAD_REQUEST,
  HTTP_CODE_404_NOT_FOUND,
} from './http-status-codes.js';

import {
  setResponseStatus,
} from 'h3';

const invalidInputResponse = (event) => {
  setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

  return {
    error_message: 'error_invalid_input',
  };
};

const notFoundResponse = (event) => {
  setResponseStatus(event, HTTP_CODE_404_NOT_FOUND);

  return {
    error_message: 'error_not_found',
  };
};

export {
  invalidInputResponse,
  notFoundResponse,
};
