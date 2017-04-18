'use strict';

const { Client } = require('./wrapper');

let count = 0;

module.exports = app => {
  app.addSingleton('catbox', createOneClient);
};

function createOneClient(config, app) {
  const name = config.engine || 'memory';
  const engine = require(`catbox-${name}`);
  const options = config.options || {};

  app.coreLogger.info('[egg-catbox] using engine: %s', name);
  const client = new Client(engine, options);

  app.beforeStart(function* () {
    yield client.start();
    const index = count++;
    const ready = client.isReady();
    const status = ready ? 'Ready' : 'Not Ready';
    app.coreLogger.info(`[egg-catbox] instance[${index}] status: ${status}`);
  });
  app.beforeClose(function* () {
    yield client.stop();
  });

  return client;
}
