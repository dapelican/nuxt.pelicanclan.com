'use strict';

import { describe, expect, it } from 'vitest';

import {
  HTTP_CODE_200_OK,
} from '../../../helpers/http-status-codes.js';

import { createTestHandler } from '../create-test-handler.js';

import handler from '../../../routes/monitoring/ping.get.js';

const request = createTestHandler('get', '/monitoring/ping', handler);

describe('GET /monitoring/ping', () => {
  it('returns a database health-check row', async () => {
    const response = await request(new Request('http://localhost/monitoring/ping'));

    expect(response.status).toBe(HTTP_CODE_200_OK);

    const data = await response.json();

    expect(data).toHaveProperty('pong');
    expect(data).toHaveProperty('rows');
    expect(data.rows).toEqual([{ id: 1 }]);
  });
});
