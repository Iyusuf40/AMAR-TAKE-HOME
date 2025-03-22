import request from 'supertest';
import app from '../server';
import assert from 'assert';
import { HTTP_STATUS } from '../constants';
import { VALID_SYMBOLS } from '../quotes/service';

describe('API', () => {
  it('should return pong for /ping', async () => {
    const res = await request(app).get('/ping');
    assert.strictEqual(res.status, HTTP_STATUS.OK);
    assert.deepStrictEqual(res.body, { message: 'pong' });
  });

  it('should return a price for a valid symbol', async () => {
    const symbol = 'AAPL';
    const res = await request(app).get(`/api/quote/${symbol}`);
    assert.strictEqual(res.status, HTTP_STATUS.OK);
    assert.strictEqual(res.body.symbol, symbol);
    assert.strictEqual(typeof res.body.price, 'number');
    assert(!Number.isNaN(res.body.price));
  });

  it('should return a price for a valid symbol regardless of case', async () => {
    const symbol = 'aapl';
    const res = await request(app).get(`/api/quote/${symbol}`);
    assert.strictEqual(res.status, HTTP_STATUS.OK);
    assert.strictEqual(res.body.symbol, symbol);
    assert.strictEqual(typeof res.body.price, 'number');
    assert(!Number.isNaN(res.body.price));
  });

  it('should return 404 for an invalid symbol', async () => {
    const symbol = 'INVALID';
    const res = await request(app).get(`/api/quote/${symbol}`);
    assert.strictEqual(res.status, HTTP_STATUS.NOT_FOUND);
    assert.strictEqual(res.body.error, true);
    assert.strictEqual(res.body.message, `Symbol '${symbol}' is not supported.`);
  });

  it('should return 404 for an invalid route', async () => {
    const res = await request(app).get(`/api/invalid`);
    assert.strictEqual(res.status, HTTP_STATUS.NOT_FOUND);
  });
});
