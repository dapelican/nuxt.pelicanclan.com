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
  executeSQLQuery,
} from '../../../database/query.js';

import {
  handleBackendError,
} from '../../../helpers/handle-backend-error.js';

import {
  invalidInputResponse,
} from '../../../helpers/http-responses.js';

import {
  parseOptionalUuid,
} from '../../../helpers/admin-schemas.js';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const tool_id = parseOptionalUuid(query.tool_id);
    const tag_id = parseOptionalUuid(query.tag_id);

    if (tool_id === undefined || tag_id === undefined) {
      return invalidInputResponse(event);
    }

    const {
      rows,
    } = await executeSQLQuery(
      `SELECT
        tt.id,
        tt.tag_id,
        tt.tool_id,
        tt.tool_specific_name,
        tt.tool_specific_url,
        t.name AS tool_name,
        COALESCE(
          NULLIF(tg.label_fr, ''),
          NULLIF(tg.label_en, ''),
          tg.slug_fr,
          tg.slug_en
        ) AS tag_label
      FROM tool_tags tt
      INNER JOIN tools t ON t.id = tt.tool_id
      INNER JOIN tags tg ON tg.id = tt.tag_id
      WHERE ($1::uuid IS NULL OR tt.tool_id = $1)
        AND ($2::uuid IS NULL OR tt.tag_id = $2)
      ORDER BY t.name, tag_label`,
      [tool_id, tag_id]
    );

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tool_tags: rows,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
