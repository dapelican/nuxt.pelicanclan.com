'use strict';

import {
  HTTP_CODE_200_OK,
  HTTP_CODE_400_BAD_REQUEST,
} from '../../helpers/http-status-codes.js';

import {
  defineEventHandler,
  setResponseStatus,
} from 'h3';

import {
  executeSQLQuery,
} from '../../database/query.js';

import {
  getSubdomain,
} from '../../helpers/get-subdomain.js';

import {
  handleBackendError,
} from '../../helpers/handle-backend-error.js';

export default defineEventHandler(async (event) => {
  try {
    const subdomain = getSubdomain(event);

    if (subdomain !== 'www' && subdomain !== 'fr') {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    const label_column = subdomain === 'www' ? 'label_en' : 'label_fr';
    const slug_column = subdomain === 'www' ? 'slug_en' : 'slug_fr';

    const {
      rows,
    } = await executeSQLQuery(
      `SELECT
        type,
        COALESCE(
          json_agg(
            to_jsonb(tags) || jsonb_build_object(
              'tool_count',
              COALESCE(tool_counts.tool_count, 0)
            )
            ORDER BY ${label_column}
          ),
          '[]'
        ) AS tags
      FROM tags
      LEFT JOIN (
        SELECT
          tag_id,
          COUNT(*)::int AS tool_count
        FROM tool_tags
        GROUP BY tag_id
      ) tool_counts ON tool_counts.tag_id = tags.id
      WHERE type IS NOT NULL
        AND trim(${label_column}) <> ''
        AND trim(${slug_column}) <> ''
      GROUP BY type
      ORDER BY type`
    );

    const tags_by_type = {};

    for (const row of rows) {
      tags_by_type[row.type] = row.tags;
    }

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tags_by_type,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
