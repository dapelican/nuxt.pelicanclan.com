'use strict';

import {
  defineEventHandler,
  readBody,
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
  tool_tag_upsert_schema,
} from '../../../helpers/admin-schemas.js';

const uniqueList = (value_list) => [...new Set(value_list)];

const idsExist = async (table_name, id_list) => {
  if (table_name !== 'tools' && table_name !== 'tags') {
    throw new Error('error_invalid_input');
  }

  const placeholder_list = id_list.map((_, index) => `$${index + 1}`).join(', ');
  const sql_query = table_name === 'tools'
    ? `SELECT id FROM tools WHERE id IN (${placeholder_list})`
    : `SELECT id FROM tags WHERE id IN (${placeholder_list})`;

  const {
    rows,
  } = await executeSQLQuery(
    sql_query,
    id_list
  );

  return rows.length === id_list.length;
};

export default defineEventHandler(async (event) => {
  try {
    const parsed_body = tool_tag_upsert_schema.safeParse(await readBody(event));

    if (!parsed_body.success) {
      return invalidInputResponse(event);
    }

    const link_by_pair = new Map();

    for (const link of parsed_body.data.link_list) {
      link_by_pair.set(`${link.tool_id}:${link.tag_id}`, link);
    }

    const link_list = [...link_by_pair.values()];
    const tool_id_list = uniqueList(link_list.map((link) => link.tool_id));
    const tag_id_list = uniqueList(link_list.map((link) => link.tag_id));
    const tools_exist = await idsExist('tools', tool_id_list);
    const tags_exist = await idsExist('tags', tag_id_list);

    if (!tools_exist || !tags_exist) {
      return invalidInputResponse(event);
    }

    const saved_link_list = [];

    for (const link of link_list) {
      const {
        rows,
      } = await executeSQLQuery(
        `INSERT INTO tool_tags (
          tag_id,
          tool_id,
          tool_specific_name,
          tool_specific_url
        ) VALUES ($1, $2, $3, $4)
        ON CONFLICT (tool_id, tag_id)
        DO UPDATE SET
          tool_specific_name = EXCLUDED.tool_specific_name,
          tool_specific_url = EXCLUDED.tool_specific_url
        RETURNING *`,
        [
          link.tag_id,
          link.tool_id,
          link.tool_specific_name,
          link.tool_specific_url,
        ]
      );

      saved_link_list.push(rows[0]);
    }

    setResponseStatus(event, HTTP_CODE_200_OK);

    return {
      tool_tags: saved_link_list,
    };
  } catch (error) {
    /* c8 ignore next */
    return handleBackendError(error, event);
  }
});
