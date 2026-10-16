'use strict';

import { fileURLToPath } from 'url';

import fs from 'fs/promises';

import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSV_PATH = path.join(__dirname, 'backup.csv');

const SQL_PATH = path.join(__dirname, 'seeds.sql');

const CSV_COLUMNS = [
  'tools|name',
  'tools|url',
  'tools|square_logo_url',
  'tags|label_en',
  'tags|slug_en',
  'tags|label_fr',
  'tags|slug_fr',
  'tool_tags|tool_specific_url',
  'tool_tags|tool_specific_name',
];

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = '';
  let in_quotes = false;

  const pushRow = () => {
    row.push(field);
    field = '';
    if (row.some((cell) => cell !== '')) {
      rows.push(row);
    }
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (in_quotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          in_quotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      in_quotes = true;
      continue;
    }

    if (char === ',') {
      row.push(field);
      field = '';
      continue;
    }

    if (char === '\n' || char === '\r') {
      if (char === '\r' && text[index + 1] === '\n') {
        index += 1;
      }
      pushRow();
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    pushRow();
  }

  return rows;
};

const recordsFromCsv = (text) => {
  const rows = parseCsv(text.replace(/^\uFEFF/, ''));
  if (rows.length === 0) {
    throw new Error('backup.csv is empty');
  }

  const header = rows[0];
  if (header.join(',') !== CSV_COLUMNS.join(',')) {
    throw new Error(`Unexpected CSV header: ${header.join(',')}`);
  }

  return rows.slice(1).map((row, index) => {
    if (row.length !== CSV_COLUMNS.length) {
      throw new Error(`Row ${index + 2} has ${row.length} columns, expected ${CSV_COLUMNS.length}`);
    }

    const record = {};
    for (let column_index = 0; column_index < CSV_COLUMNS.length; column_index += 1) {
      record[CSV_COLUMNS[column_index]] = row[column_index];
    }
    return record;
  });
};

const skipWhitespace = (sql, index) => {
  let next_index = index;
  while (next_index < sql.length && /\s/.test(sql[next_index])) {
    next_index += 1;
  }
  return next_index;
};

const readSqlLiteral = (sql, index) => {
  const start = skipWhitespace(sql, index);
  if (sql.startsWith('NULL', start)) {
    return { value: null, index: start + 4 };
  }
  if (sql[start] !== '\'') {
    throw new Error('Expected a SQL string while reading existing tag types');
  }

  let value = '';
  let next_index = start + 1;
  while (next_index < sql.length) {
    const char = sql[next_index];
    if (char === '\'') {
      if (sql[next_index + 1] === '\'') {
        value += '\'';
        next_index += 2;
        continue;
      }
      return { value, index: next_index + 1 };
    }
    value += char;
    next_index += 1;
  }

  throw new Error('Unterminated SQL string while reading existing tag types');
};

const readTagTypes = (sql) => {
  const types_by_slug = new Map();
  const insert_index = sql.indexOf('INSERT INTO tags');
  if (insert_index === -1) {
    return types_by_slug;
  }

  const values_index = sql.indexOf('VALUES', insert_index);
  if (values_index === -1) {
    return types_by_slug;
  }

  let index = values_index + 'VALUES'.length;
  while (index < sql.length) {
    index = skipWhitespace(sql, index);
    if (index >= sql.length || sql[index] === ';') {
      break;
    }
    if (sql[index] === ',') {
      index += 1;
      continue;
    }
    if (sql[index] !== '(') {
      throw new Error('Expected a tag tuple while reading existing tag types');
    }

    index += 1;
    const values = [];
    while (index < sql.length) {
      const literal = readSqlLiteral(sql, index);
      values.push(literal.value);
      index = skipWhitespace(sql, literal.index);
      if (sql[index] === ',') {
        index += 1;
        continue;
      }
      if (sql[index] === ')') {
        index += 1;
        break;
      }
      throw new Error('Expected the end of a tag tuple while reading existing tag types');
    }

    const slug_en = values[1];
    const type = values[4];
    if (slug_en && type) {
      types_by_slug.set(slug_en, type);
    }
  }

  return types_by_slug;
};

const emptyToNull = (value) => (value === '' ? null : value);

const collectSeedData = (records, types_by_slug) => {
  const tools = [];
  const tools_by_name = new Map();
  const tags = [];
  const tags_by_slug = new Map();
  const links = [];

  for (const record of records) {
    const tool_name = record['tools|name'];
    const tool_url = record['tools|url'];
    const square_logo_url = emptyToNull(record['tools|square_logo_url']);

    if (!tool_name || !tool_url) {
      throw new Error('Each CSV row needs a tool name and url');
    }

    const existing_tool = tools_by_name.get(tool_name);
    if (!existing_tool) {
      const tool = {
        name: tool_name,
        url: tool_url,
        square_logo_url,
      };
      tools_by_name.set(tool_name, tool);
      tools.push(tool);
    } else if (existing_tool.url !== tool_url || existing_tool.square_logo_url !== square_logo_url) {
      throw new Error(`Conflicting tool values for "${tool_name}"`);
    }

    const slug_en = record['tags|slug_en'];
    const label_en = record['tags|label_en'];
    const label_fr = record['tags|label_fr'];
    const slug_fr = record['tags|slug_fr'];

    if (!slug_en) {
      throw new Error(`Missing tag slug_en for tool "${tool_name}"`);
    }

    const existing_tag = tags_by_slug.get(slug_en);
    if (!existing_tag) {
      let type = types_by_slug.get(slug_en);
      if (!type) {
        type = 'goal';
        console.warn(`No existing type for tag "${slug_en}", defaulting to 'goal'`);
      }
      const tag = {
        label_en,
        slug_en,
        label_fr,
        slug_fr,
        type,
      };
      tags_by_slug.set(slug_en, tag);
      tags.push(tag);
    } else if (
      existing_tag.label_en !== label_en
      || existing_tag.label_fr !== label_fr
      || existing_tag.slug_fr !== slug_fr
    ) {
      throw new Error(`Conflicting tag values for "${slug_en}"`);
    }

    links.push({
      tool_name,
      tag_slug_en: slug_en,
      tool_specific_url: emptyToNull(record['tool_tags|tool_specific_url']),
      tool_specific_name: emptyToNull(record['tool_tags|tool_specific_name']),
    });
  }

  return {
    tools,
    tags,
    links,
  };
};

const toSqlLiteral = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'NULL';
  }
  return `'${String(value).replaceAll('\'', '\'\'')}'`;
};

const formatValueRows = (rows, terminator = ';') => rows.map((row, index) => {
  const separator = index === rows.length - 1 ? terminator : ',';
  return `  (${row.join(', ')})${separator}`;
}).join('\n');

const buildSql = ({ tools, tags, links }) => {
  const tool_rows = tools.map((tool) => [
    toSqlLiteral(tool.name),
    toSqlLiteral(tool.url),
    toSqlLiteral(tool.square_logo_url),
  ]);
  const tag_rows = tags.map((tag) => [
    toSqlLiteral(tag.label_en),
    toSqlLiteral(tag.slug_en),
    toSqlLiteral(tag.label_fr),
    toSqlLiteral(tag.slug_fr),
    toSqlLiteral(tag.type),
  ]);
  const link_rows = links.map((link) => [
    toSqlLiteral(link.tool_name),
    toSqlLiteral(link.tag_slug_en),
    toSqlLiteral(link.tool_specific_url),
    toSqlLiteral(link.tool_specific_name),
  ]);

  return `-- =============================================
-- Tools
-- =============================================
INSERT INTO tools (name, url, square_logo_url)
VALUES
${formatValueRows(tool_rows)}

-- =============================================
-- Tags
-- =============================================
INSERT INTO tags (label_en, slug_en, label_fr, slug_fr, type)
VALUES
${formatValueRows(tag_rows)}

-- =============================================
-- Tool–tag links, resolved by tool name and tag slug_en
-- =============================================
INSERT INTO tool_tags (tool_id, tag_id, tool_specific_url, tool_specific_name)
SELECT tools.id, tags.id, v.tool_specific_url, v.tool_specific_name
FROM (VALUES
${formatValueRows(link_rows, '')}
) AS v(tool_name, tag_slug_en, tool_specific_url, tool_specific_name)
JOIN tools ON tools.name = v.tool_name
JOIN tags ON tags.slug_en = v.tag_slug_en;
`;
};

const generateSeeds = async () => {
  const csv_text = await fs.readFile(CSV_PATH, 'utf8');
  let existing_sql = '';
  try {
    existing_sql = await fs.readFile(SQL_PATH, 'utf8');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
    console.warn('No existing seeds.sql; new tags will default to goal');
  }

  const seed_data = collectSeedData(recordsFromCsv(csv_text), readTagTypes(existing_sql));
  await fs.writeFile(SQL_PATH, buildSql(seed_data));
  console.log(`Wrote ${seed_data.tools.length} tools, ${seed_data.tags.length} tags, and ${seed_data.links.length} links to seeds.sql`);
};

try {
  await generateSeeds();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
