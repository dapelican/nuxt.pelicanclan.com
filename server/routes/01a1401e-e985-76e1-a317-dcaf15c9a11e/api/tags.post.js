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
  tag_body_schema,
} from '../../../helpers/admin-schemas.js';

export default defineEventHandler(async (event) => {
  try {
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
      type,
    } = parsed_body.data;

    const {
      rows,
    } = await executeSQLQuery(
      `INSERT INTO tags (
        html_en,
        html_fr,
        label_en,
        label_fr,
        slug_en,
        slug_fr,
        type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        html_en,
        html_fr,
        label_en,
        label_fr,
        slug_en,
        slug_fr,
        type,
      ]
    );

    setResponseStatus(event, HTTP_CODE_201_CREATED);

    return {
      tag: rows[0],
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
