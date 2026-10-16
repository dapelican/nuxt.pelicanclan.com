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

const DEFAULT_TOOLS_LIMIT = 20;

export default defineEventHandler(async (event) => {
  try {
    const subdomain = getSubdomain(event);

    if (subdomain !== 'www' && subdomain !== 'fr') {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    const active_column = subdomain === 'www' ? 'active_en' : 'active_fr';
    const label_column = subdomain === 'www' ? 'label_en' : 'label_fr';

    const {
      rows: tool_list,
    } = await executeSQLQuery(
      `SELECT
        t.*,
        COALESCE(
          json_agg(
            to_jsonb(tg) || jsonb_build_object(
              'tool_specific_url', tt.tool_specific_url,
              'tool_specific_name', tt.tool_specific_name
            )
            ORDER BY tg.${label_column}
          ) FILTER (WHERE tg.id IS NOT NULL),
          '[]'
        ) AS tags
      FROM tools t
      LEFT JOIN tool_tags tt ON tt.tool_id = t.id
      LEFT JOIN tags tg ON tg.id = tt.tag_id
      WHERE t.${active_column} = true
      GROUP BY t.id
      ORDER BY RANDOM()
      LIMIT $1`,
      [DEFAULT_TOOLS_LIMIT]
    );

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tool_list,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
