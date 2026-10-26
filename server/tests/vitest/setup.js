import { beforeEach, vi } from 'vitest';

globalThis.useRuntimeConfig = vi.fn(() => ({
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  EMAILABLE_API_KEY: 'test-emailable-key',
  SESSION_MAX_AGE_DAYS: '30',
  turnstile: {
    secretKey: '1x0000000000000000000000000000000AA',
  },
}));

globalThis.setUserSession = vi.fn(async () => {});
globalThis.getUserSession = vi.fn(async () => ({}));
globalThis.clearUserSession = vi.fn(async () => {});
globalThis.replaceUserSession = vi.fn(async () => {});

beforeEach(() => {
  vi.mocked(globalThis.useRuntimeConfig).mockReturnValue({
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    EMAILABLE_API_KEY: 'test-emailable-key',
    SESSION_MAX_AGE_DAYS: '30',
    turnstile: {
      secretKey: '1x0000000000000000000000000000000AA',
    },
  });
  vi.mocked(globalThis.setUserSession).mockReset().mockResolvedValue(undefined);
  vi.mocked(globalThis.getUserSession).mockReset().mockResolvedValue({});
  vi.mocked(globalThis.clearUserSession).mockReset().mockResolvedValue(undefined);
  vi.mocked(globalThis.replaceUserSession).mockReset().mockResolvedValue(undefined);
});
