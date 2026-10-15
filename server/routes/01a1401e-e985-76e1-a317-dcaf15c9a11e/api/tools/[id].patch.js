'use strict';

import {
  defineEventHandler,
  getRouterParam,
  readBody,
  setResponseStatus,
} from 'h3';

import {
  invalidInputResponse,
  notFoundResponse,
} from '../../../../helpers/http-responses.js';

import {
  HTTP_CODE_200_OK,
} from '../../../../helpers/http-status-codes.js';

import {
  executeSQLQuery,
} from '../../../../database/query.js';

import {
  handleBackendError,
} from '../../../../helpers/handle-backend-error.js';

import {
  tool_body_schema,
} from '../../../../helpers/admin-schemas.js';

import {
  validateUUID,
} from '../../../../helpers/validators.js';

export default defineEventHandler(async (event) => {
  try {
    const tool_id = getRouterParam(event, 'id');

    if (!validateUUID(tool_id)) {
      return invalidInputResponse(event);
    }

    const parsed_body = tool_body_schema.safeParse(await readBody(event));

    if (!parsed_body.success) {
      return invalidInputResponse(event);
    }

    const {
      active_en,
      active_fr,
      name,
      square_logo_url,
      status,
      url,
    } = parsed_body.data;

    const {
      rows,
    } = await executeSQLQuery(
      `UPDATE tools
      SET
        active_en = $2,
        active_fr = $3,
        name = $4,
        square_logo_url = $5,
        status = $6,
        url = $7
      WHERE id = $1
      RETURNING *`,
      [
        tool_id,
        active_en,
        active_fr,
        name,
        square_logo_url || null,
        status,
        url,
      ]
    );

    if (!rows.length) {
      return notFoundResponse(event);
    }

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tool: rows[0],
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
