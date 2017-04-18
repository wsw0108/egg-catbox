'use strict';

const catbox = require('./lib/catbox');

module.exports = agent => {
  if (agent.config.catbox.agent) catbox(agent);
};
