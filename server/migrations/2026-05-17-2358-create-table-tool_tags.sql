CREATE TABLE tool_tags (
  id UUID PRIMARY KEY DEFAULT uuidv7(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now() ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  tool_specific_url TEXT,
  UNIQUE(tool_id, tag_id)
);

CREATE TRIGGER update_tool_tags_timestamp
BEFORE UPDATE ON tool_tags
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();