CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuidv7(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now() ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  square_logo_url TEXT,
  active_en BOOLEAN DEFAULT TRUE,
  active_fr BOOLEAN DEFAULT TRUE,
  start_date TEXT,
  comment TEXT
);

CREATE TRIGGER update_tools_timestamp
BEFORE UPDATE ON tools
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
