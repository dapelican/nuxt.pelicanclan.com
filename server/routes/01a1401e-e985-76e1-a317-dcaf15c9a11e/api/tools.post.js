import {
  defineEventHandler,
  readBody,
  setResponseStatus,
} from 'h3';

import {
  HTTP_CODE_201_CREATED,
} from '../../../helpers/http-status-codes.js';

import {
  executeSQLQuery,
} from '../../../database/query.js';

import {
  handleBackendError,
} from '../../../helpers/handle-backend-error.js';

import {
  invalidInputResponse,
} from '../../../helpers/http-responses.js';

import {
  tool_body_schema,
} from '../../../helpers/admin-schemas.js';

export default defineEventHandler(async (event) => {
  try {
    const parsed_body = tool_body_schema.safeParse(await readBody(event));

    if (!parsed_body.success) {
      return invalidInputResponse(event);
    }

    const {
      active_en,
      active_fr,
      comment,
      name,
      square_logo_url,
      url,
    } = parsed_body.data;

    const {
      rows,
    } = await executeSQLQuery(
      `INSERT INTO tools (
        active_en,
        active_fr,
        comment,
        name,
        square_logo_url,
        url
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        active_en,
        active_fr,
        comment || null,
        name,
        square_logo_url || null,
        url,
      ]
    );

    setResponseStatus(event, HTTP_CODE_201_CREATED);

    return {
      tool: rows[0],
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
