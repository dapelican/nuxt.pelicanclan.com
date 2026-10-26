CREATE TABLE user_email_tokens (
  id UUID PRIMARY KEY DEFAULT uuidv7(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now() ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT,
  usage TEXT,
  blacklisted BOOLEAN DEFAULT FALSE,
  pending_email TEXT
);

CREATE TRIGGER update_user_email_tokens_timestamp
BEFORE UPDATE ON user_email_tokens
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE INDEX IF NOT EXISTS user_email_tokens_token_idx
  ON user_email_tokens (token);

CREATE INDEX IF NOT EXISTS user_email_tokens_user_id_usage_created_at_idx
  ON user_email_tokens (user_id, usage, created_at);

