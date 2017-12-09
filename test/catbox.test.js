'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/catbox.test.js', () => {
  let app;
  const testKey = { id: 'catbox', segment: 'segment' };
  const testValue = { data: 'test data' };

  before(() => {
    app = mm.app({
      baseDir: 'apps/catbox-test',
    });
    return app.ready();
  });

  after(() => app.close());

  beforeEach(async () => {
    await app.catbox.set(testKey, testValue, 2000);
  });

  afterEach(async () => {
    await app.catbox.drop(testKey);
  });

  afterEach(mm.restore);

  it('should get successfully', async () => {
    const cached = await app.catbox.get(testKey);
    assert.deepEqual(cached.item, testValue);
  });

  it('should set successfully', async () => {
    const id = 'id';
    const segment = 'segment';
    const key = { id, segment };
    const value = 'value';
    await app.catbox.set(key, value, 2000);
    const cached = await app.catbox.get(key);
    assert.deepEqual(cached.item, value);
  });

  it('should drop successfully', async () => {
    const id = 'id';
    const segment = 'segment';
    const key = { id, segment };
    const value = 'value';
    await app.catbox.set(key, value, 2000);
    await app.catbox.drop(key);
    const result = await app.catbox.get(key);
    assert(!result);
  });
});
