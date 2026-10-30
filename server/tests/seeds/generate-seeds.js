import { fileURLToPath } from 'url';

import fs from 'fs/promises';

import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSV_PATH = path.join(__dirname, 'backup.csv');

const SQL_PATH = path.join(__dirname, '1-pelicanclan-seeds.sql');

const CSV_COLUMNS = [
  'tools|name',
  'tools|url',
  'tools|square_logo_url',
  'tags|label_en',
  'tags|slug_en',
  'tags|label_fr',
  'tags|slug_fr',
  'tags|type',
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

const emptyToNull = (value) => (value === '' ? null : value);

const tagIndexKey = (kind, value) => (value ? `${kind}:${value}` : null);

const findTag = (tags_by_key, kind, value) => {
  const key = tagIndexKey(kind, value);
  return key ? tags_by_key.get(key) : undefined;
};

const indexTag = (tags_by_key, tag) => {
  const indexKey = (key) => {
    if (!key) {
      return;
    }
    const indexed = tags_by_key.get(key);
    if (indexed && indexed !== tag) {
      throw new Error(`Conflicting tag values for "${key}"`);
    }
    tags_by_key.set(key, tag);
  };

  indexKey(tagIndexKey('slug_en', tag.slug_en));
  indexKey(tagIndexKey('slug_fr', tag.slug_fr));
  indexKey(tagIndexKey('label_en', tag.label_en));
  indexKey(tagIndexKey('label_fr', tag.label_fr));
};

const fillTagField = (tag, field, incoming, identity) => {
  if (incoming == null) {
    return;
  }
  if (tag[field] == null) {
    tag[field] = incoming;
    return;
  }
  if (tag[field] !== incoming) {
    throw new Error(`Conflicting tag values for "${identity}"`);
  }
};

const collectSeedData = (records) => {
  const tools = [];
  const tools_by_name = new Map();
  const tags = [];
  const tags_by_key = new Map();
  const links = [];

  for (const record of records) {
    const tool_name = record['tools|name'];
    const tool_url = record['tools|url'];
    const square_logo_url = emptyToNull(record['tools|square_logo_url']);
    const label_en = emptyToNull(record['tags|label_en']);
    const active_en = label_en === null ? null : true;

    if (!tool_name || !tool_url) {
      throw new Error('Each CSV row needs a tool name and url');
    }

    const existing_tool = tools_by_name.get(tool_name);
    if (!existing_tool) {
      const tool = {
        name: tool_name,
        url: tool_url,
        square_logo_url,
        active_en,
        active_fr: true,
      };
      tools_by_name.set(tool_name, tool);
      tools.push(tool);
    } else if (existing_tool.url !== tool_url || existing_tool.square_logo_url !== square_logo_url) {
      throw new Error(`Conflicting tool values for "${tool_name}"`);
    } else if (active_en === null) {
      existing_tool.active_en = null;
    }

    const slug_en = emptyToNull(record['tags|slug_en']);
    const label_fr = emptyToNull(record['tags|label_fr']);
    const slug_fr = emptyToNull(record['tags|slug_fr']);
    const type = emptyToNull(record['tags|type']) ?? 'main_use';

    if (!slug_en && !slug_fr && !label_en && !label_fr) {
      continue;
    }

    const identity = slug_en || slug_fr || label_en || label_fr;
    const matches = [
      findTag(tags_by_key, 'slug_en', slug_en),
      findTag(tags_by_key, 'slug_fr', slug_fr),
      findTag(tags_by_key, 'label_en', label_en),
      findTag(tags_by_key, 'label_fr', label_fr),
    ].filter((tag) => tag);
    const unique_matches = [...new Set(matches)];
    if (unique_matches.length > 1) {
      throw new Error(`Conflicting tag values for "${identity}"`);
    }

    let tag = unique_matches[0];
    if (!tag) {
      tag = {
        label_en,
        slug_en,
        label_fr,
        slug_fr,
        type,
      };
      tags.push(tag);
    } else {
      fillTagField(tag, 'label_en', label_en, identity);
      fillTagField(tag, 'slug_en', slug_en, identity);
      fillTagField(tag, 'label_fr', label_fr, identity);
      fillTagField(tag, 'slug_fr', slug_fr, identity);
      fillTagField(tag, 'type', type, identity);
    }
    indexTag(tags_by_key, tag);

    links.push({
      tool_name,
      tag,
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
    tool.active_en === null ? 'NULL' : 'true',
    tool.active_fr ? 'true' : 'false',
  ]);

  let sql = `-- =============================================
-- Tools
-- =============================================
INSERT INTO tools (name, url, square_logo_url, active_en, active_fr)
VALUES
${formatValueRows(tool_rows)}
`;

  if (tags.length === 0) {
    return sql;
  }

  const tag_rows = tags.map((tag) => [
    toSqlLiteral(tag.label_en),
    toSqlLiteral(tag.slug_en),
    toSqlLiteral(tag.label_fr),
    toSqlLiteral(tag.slug_fr),
    toSqlLiteral(tag.type),
  ]);
  const link_rows = links.map((link) => [
    toSqlLiteral(link.tool_name),
    toSqlLiteral(link.tag.slug_en),
    toSqlLiteral(link.tag.slug_fr),
    toSqlLiteral(link.tag.label_en),
    toSqlLiteral(link.tag.label_fr),
    toSqlLiteral(link.tag.type),
    toSqlLiteral(link.tool_specific_url),
    toSqlLiteral(link.tool_specific_name),
  ]);

  sql += `
-- =============================================
-- Tags
-- =============================================
INSERT INTO tags (label_en, slug_en, label_fr, slug_fr, type)
VALUES
${formatValueRows(tag_rows)}
`;

  if (links.length === 0) {
    return sql;
  }

  sql += `
-- =============================================
-- Tool–tag links, resolved by slug when present, otherwise by label and type
-- =============================================
INSERT INTO tool_tags (tool_id, tag_id, tool_specific_url, tool_specific_name)
SELECT tools.id, tags.id, v.tool_specific_url, v.tool_specific_name
FROM (VALUES
${formatValueRows(link_rows, '')}
) AS v(tool_name, tag_slug_en, tag_slug_fr, tag_label_en, tag_label_fr, tag_type, tool_specific_url, tool_specific_name)
JOIN tools ON tools.name = v.tool_name
JOIN tags ON (
  (v.tag_slug_en IS NOT NULL AND tags.slug_en = v.tag_slug_en)
    OR (
      v.tag_slug_en IS NULL
      AND v.tag_slug_fr IS NOT NULL
      AND tags.slug_fr = v.tag_slug_fr
    )
    OR (
      v.tag_slug_en IS NULL
      AND v.tag_slug_fr IS NULL
      AND tags.label_en IS NOT DISTINCT FROM v.tag_label_en
      AND tags.label_fr IS NOT DISTINCT FROM v.tag_label_fr
      AND tags.type = v.tag_type
    )
);
`;

  return sql;
};

const generateSeeds = async () => {
  const csv_text = await fs.readFile(CSV_PATH, 'utf8');
  const seed_data = collectSeedData(recordsFromCsv(csv_text));
  await fs.writeFile(SQL_PATH, buildSql(seed_data));
  console.log(`Wrote ${seed_data.tools.length} tools, ${seed_data.tags.length} tags, and ${seed_data.links.length} links to 1-pelicanclan-seeds.sql`);
};

try {
  await generateSeeds();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
