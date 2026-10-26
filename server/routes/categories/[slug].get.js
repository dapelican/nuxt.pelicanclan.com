import {
  HTTP_CODE_200_OK,
  HTTP_CODE_400_BAD_REQUEST,
} from '../../helpers/http-status-codes.js';

import {
  defineEventHandler,
  getRouterParam,
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

import {
  validateNonEmptyInputFieldList,
} from '../../helpers/validators.js';

export default defineEventHandler(async (event) => {
  try {
    let slug = await getRouterParam(event, 'slug');

    if (typeof slug !== 'string') {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    slug = slug.trim();

    if (!validateNonEmptyInputFieldList([slug])) {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    const subdomain = getSubdomain(event);

    if (subdomain !== 'www' && subdomain !== 'fr') {
      setResponseStatus(event, HTTP_CODE_400_BAD_REQUEST);

      return {
        error_message: 'error_invalid_input',
      };
    }

    const slug_column = subdomain === 'www' ? 'slug_en' : 'slug_fr';
    const label_column = subdomain === 'www' ? 'label_en' : 'label_fr';
    const active_column = subdomain === 'www' ? 'active_en' : 'active_fr';

    const {
      rows: tag_rows,
    } = await executeSQLQuery(
      `SELECT *
      FROM tags
      WHERE ${slug_column} = $1
      LIMIT 1`,
      [slug]
    );

    const tag = tag_rows[0] ?? null;

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
      INNER JOIN tool_tags tt_filter ON tt_filter.tool_id = t.id
      INNER JOIN tags tag_filter ON tag_filter.id = tt_filter.tag_id
        AND tag_filter.${slug_column} = $1
      LEFT JOIN tool_tags tt ON tt.tool_id = t.id
      LEFT JOIN tags tg ON tg.id = tt.tag_id
      WHERE t.${active_column} = true
      GROUP BY t.id`,
      [slug]
    );

    tool_list.sort((tool_a, tool_b) => tool_a.name.localeCompare(tool_b.name));

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tag,
      tools: tool_list,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
