# egg-catbox

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-catbox.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-catbox
[travis-image]: https://img.shields.io/travis/eggjs/egg-catbox.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-catbox
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-catbox.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-catbox?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-catbox.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-catbox
[snyk-image]: https://snyk.io/test/npm/egg-catbox/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-catbox
[download-image]: https://img.shields.io/npm/dm/egg-catbox.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-catbox

[Catbox](https://github.com/hapijs/catbox) plugin for egg framework.

## Install

```bash
$ npm i egg-catbox --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.catbox = {
  enable: true,
  package: 'egg-catbox',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.catbox = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// {app_root}/app/service/user.js
const segment = 'segment';
module.exports = app => {
  class UserService extends app.Service {
    * save(user, ttl) {
      const id = 'id';
      const key = { id, segment };
      yield app.catbox.set(key, user, ttl);
    }
    * load(id) {
      const key = { id, segment };
      const result = yield app.catbox.get(key);
      return result ? result.item : null;
    }
    * drop(id) {
      const key = { id, segment };
      yield app.catbox.drop(key);
    }
  }
  return UserService;
}
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
