import {
  HTTP_CODE_201_CREATED,
  HTTP_CODE_400_BAD_REQUEST,
  HTTP_CODE_404_NOT_FOUND,
  HTTP_CODE_413_PAYLOAD_TOO_LARGE,
} from '../../helpers/http-status-codes.js';

import {
  defineEventHandler,
  getRequestHeader,
  readRawBody,
  setResponseStatus,
} from 'h3';

import {
  executeSQLQuery,
} from '../../database/query.js';

import {
  handleBackendError,
} from '../../helpers/handle-backend-error.js';

const CONTENT_MAX_BYTES = 16384;

const isJsonString = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV === 'production') {
    setResponseStatus(event, HTTP_CODE_404_NOT_FOUND);

    return {
      error_message: 'error_not_found',
    };
  }

  try {
    const content_length_header = getRequestHeader(event, 'content-length');
    const content_length = content_length_header === undefined
      ? undefined
      : Number(content_length_header);

    if (
      Number.isFinite(content_length)
      && content_length > CONTENT_MAX_BYTES
    ) {
      setResponseStatus(event, HTTP_CODE_413_PAYLOAD_TOO_LARGE);

      return {
        error_message: 'error_payload_too_large',
      };
    }

    const raw_body = await readRawBody(event);
    const raw_body_bytes = Buffer.byteLength(raw_body ?? '', 'utf8');

    if (raw_body_bytes > CONTENT_MAX_BYTES) {
      setResponseStatus(event, HTTP_CODE_413_PAYLOAD_TOO_LARGE);

      return {
        error_message: 'error_payload_too_large',
      };
    }

    let body;

    try {
      body = raw_body ? JSON.parse(raw_body) : undefined;
    } catch {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    const content = body?.content;

    if (typeof content !== 'string' || !isJsonString(content)) {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    await executeSQLQuery(
      'INSERT into logs (content) VALUES ($1)',
      [content]
    );

    setResponseStatus(event, HTTP_CODE_201_CREATED);

    return {};
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
