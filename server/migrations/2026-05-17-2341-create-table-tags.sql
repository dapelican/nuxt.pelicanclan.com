CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuidv7(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now() ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  label_en TEXT,
  slug_en TEXT,
  html_en TEXT,
  label_fr TEXT,
  slug_fr TEXT,
  html_fr TEXT,
  type TEXT -- main_use, characteristics
);

CREATE TRIGGER update_tags_timestamp
BEFORE UPDATE ON tags
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();