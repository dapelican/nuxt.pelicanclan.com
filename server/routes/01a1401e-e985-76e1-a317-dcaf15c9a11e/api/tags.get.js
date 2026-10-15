'use strict';

import {
  defineEventHandler,
  getQuery,
  setResponseStatus,
} from 'h3';

import {
  HTTP_CODE_200_OK,
} from '../../../helpers/http-status-codes.js';

import {
  escapeLikePattern,
} from '../../../helpers/admin-schemas.js';

import {
  executeSQLQuery,
} from '../../../database/query.js';

import {
  handleBackendError,
} from '../../../helpers/handle-backend-error.js';

import {
  invalidInputResponse,
} from '../../../helpers/http-responses.js';

export default defineEventHandler(async (event) => {
  try {
    const raw_query = getQuery(event).query;

    if (Array.isArray(raw_query) || (raw_query !== undefined && typeof raw_query !== 'string')) {
      return invalidInputResponse(event);
    }

    const search_query = typeof raw_query === 'string' ? raw_query.trim() : '';
    const parameter_list = [];
    let where_clause = '';

    if (search_query) {
      parameter_list.push(`%${escapeLikePattern(search_query)}%`);
      where_clause = `WHERE (
        label_en ILIKE $1 ESCAPE '\\'
        OR label_fr ILIKE $1 ESCAPE '\\'
        OR slug_en ILIKE $1 ESCAPE '\\'
        OR slug_fr ILIKE $1 ESCAPE '\\'
      )`;
    }

    const {
      rows,
    } = await executeSQLQuery(
      `SELECT
        tg.*,
        t.name AS sponsored_tool_name
      FROM tags tg
      LEFT JOIN tools t ON t.id = tg.sponsored_tool_id
      ${where_clause}
      ORDER BY COALESCE(NULLIF(tg.label_fr, ''), NULLIF(tg.label_en, ''), tg.slug_fr, tg.slug_en)`,
      parameter_list
    );

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tags: rows,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
