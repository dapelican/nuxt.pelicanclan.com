'use strict';

import {
  defineEventHandler,
  getRouterParam,
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
  validateUUID,
} from '../../../../helpers/validators.js';

export default defineEventHandler(async (event) => {
  try {
    const tool_tag_id = getRouterParam(event, 'id');

    if (!validateUUID(tool_tag_id)) {
      return invalidInputResponse(event);
    }

    const {
      rows,
    } = await executeSQLQuery(
      'DELETE FROM tool_tags WHERE id = $1 RETURNING id',
      [tool_tag_id]
    );

    if (!rows.length) {
      return notFoundResponse(event);
    }

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      deleted_id: rows[0].id,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
