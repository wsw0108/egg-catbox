'use strict';

const catbox = require('./lib/catbox');

module.exports = app => {
  if (app.config.catbox.app) catbox(app);
};
