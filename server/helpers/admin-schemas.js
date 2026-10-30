import { z } from 'zod';

const optional_url_schema = z.union([
  z.literal(''),
  z.url().max(2000),
]);

const tool_body_schema = z.object({
  active_en: z.boolean(),
  active_fr: z.boolean(),
  comment: z.string().trim().max(10000),
  name: z.string().trim().min(1).max(300),
  square_logo_url: optional_url_schema,
  url: z.url().max(2000),
});

const tag_body_schema = z.object({
  html_en: z.string().trim().max(50000),
  html_fr: z.string().trim().max(50000),
  label_en: z.string().trim().max(300),
  label_fr: z.string().trim().max(300),
  slug_en: z.string().trim().max(300),
  slug_fr: z.string().trim().max(300),
  type: z.enum(['main_use', 'characteristics']),
}).superRefine((value, context) => {
  if (!value.label_en && !value.label_fr) {
    context.addIssue({
      code: 'custom',
      message: 'missing_label',
      path: ['label_fr'],
    });
  }
});

const tool_tag_link_schema = z.object({
  tag_id: z.uuid(),
  tool_id: z.uuid(),
  tool_specific_name: z.string().trim().max(500),
  tool_specific_url: optional_url_schema,
});

const tool_tag_upsert_schema = z.object({
  link_list: z.array(tool_tag_link_schema).min(1).max(500),
});

const escapeLikePattern = (value) => value.replace(/[\\%_]/g, (character) => `\\${character}`);

const parseOptionalUuid = (value) => {
  if (value === undefined || value === '') {
    return null;
  }

  if (typeof value !== 'string' || !z.uuid().safeParse(value).success) {
    return undefined;
  }

  return value;
};

export {
  escapeLikePattern,
  parseOptionalUuid,
  tag_body_schema,
  tool_body_schema,
  tool_tag_upsert_schema,
};
