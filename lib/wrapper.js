'use strict';

const catbox = require('catbox');

exports.Client = class Client {
  constructor(engine, options) {
    this.client = new catbox.Client(engine, options);
  }
  start() {
    return new Promise((resolve, reject) => {
      this.client.start(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
  stop() {
    this.client.stop();
    return Promise.resolve();
  }
  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, cached) => {
        if (err) return reject(err);
        resolve(cached);
      });
    });
  }
  set(key, value, ttl) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, ttl, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  drop(key) {
    return new Promise((resolve, reject) => {
      this.client.drop(key, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
  isReady() {
    return this.client.isReady();
  }
};
