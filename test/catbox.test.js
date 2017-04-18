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

  beforeEach(function* () {
    yield app.catbox.set(testKey, testValue, 2000);
  });

  afterEach(function* () {
    yield app.catbox.drop(testKey);
  });

  afterEach(mm.restore);

  it('should get successfully', function* () {
    const cached = yield app.catbox.get(testKey);
    assert.deepEqual(cached.item, testValue);
  });

  it('should set successfully', function* () {
    const id = 'id';
    const segment = 'segment';
    const key = { id, segment };
    const value = 'value';
    yield app.catbox.set(key, value, 2000);
    const cached = yield app.catbox.get(key);
    assert.deepEqual(cached.item, value);
  });

  it('should drop successfully', function* () {
    const id = 'id';
    const segment = 'segment';
    const key = { id, segment };
    const value = 'value';
    yield app.catbox.set(key, value, 2000);
    yield app.catbox.drop(key);
    const result = yield app.catbox.get(key);
    assert(!result);
  });
});
