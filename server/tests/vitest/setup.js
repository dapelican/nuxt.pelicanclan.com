'use strict';

import { beforeEach, vi } from 'vitest';
import { setResponseStatus } from 'h3';

globalThis.useRuntimeConfig = vi.fn(() => ({
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
}));

globalThis.setResponseStatus = setResponseStatus;

beforeEach(() => {
  vi.mocked(globalThis.useRuntimeConfig).mockReturnValue({
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  });
});
