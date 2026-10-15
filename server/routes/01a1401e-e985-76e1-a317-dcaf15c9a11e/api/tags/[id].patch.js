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
  tag_body_schema,
} from '../../../../helpers/admin-schemas.js';

import {
  validateUUID,
} from '../../../../helpers/validators.js';

export default defineEventHandler(async (event) => {
  try {
    const tag_id = getRouterParam(event, 'id');

    if (!validateUUID(tag_id)) {
      return invalidInputResponse(event);
    }

    const parsed_body = tag_body_schema.safeParse(await readBody(event));

    if (!parsed_body.success) {
      return invalidInputResponse(event);
    }

    const {
      html_en,
      html_fr,
      label_en,
      label_fr,
      slug_en,
      slug_fr,
      sponsored_tool_id,
      type,
    } = parsed_body.data;

    if (sponsored_tool_id) {
      const {
        rows: tool_rows,
      } = await executeSQLQuery(
        'SELECT id FROM tools WHERE id = $1',
        [sponsored_tool_id]
      );

      if (!tool_rows.length) {
        return invalidInputResponse(event);
      }
    }

    const {
      rows,
    } = await executeSQLQuery(
      `UPDATE tags
      SET
        html_en = $2,
        html_fr = $3,
        label_en = $4,
        label_fr = $5,
        slug_en = $6,
        slug_fr = $7,
        sponsored_tool_id = $8,
        type = $9
      WHERE id = $1
      RETURNING *`,
      [
        tag_id,
        html_en,
        html_fr,
        label_en,
        label_fr,
        slug_en,
        slug_fr,
        sponsored_tool_id,
        type,
      ]
    );

    if (!rows.length) {
      return notFoundResponse(event);
    }

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tag: rows[0],
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
