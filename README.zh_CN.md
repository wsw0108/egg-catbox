# egg-catbox

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-catbox.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-catbox
[travis-image]: https://img.shields.io/travis/wsw0108/egg-catbox.svg?style=flat-square
[travis-url]: https://travis-ci.org/wsw0108/egg-catbox
[codecov-image]: https://img.shields.io/codecov/c/github/wsw0108/egg-catbox.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wsw0108/egg-catbox?branch=master
[david-image]: https://img.shields.io/david/wsw0108/egg-catbox.svg?style=flat-square
[david-url]: https://david-dm.org/wsw0108/egg-catbox
[snyk-image]: https://snyk.io/test/npm/egg-catbox/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-catbox
[download-image]: https://img.shields.io/npm/dm/egg-catbox.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-catbox

[Catbox](https://github.com/hapijs/catbox) plugin for egg framework.

## 安装

```bash
$ npm i egg-catbox --save
```

## 依赖说明

### 依赖的 egg 版本

egg-catbox 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

## 开启插件

```js
// config/plugin.js
exports.catbox = {
  enable: true,
  package: 'egg-catbox',
};
```

## 使用场景

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

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 提问交流

请到 [egg issues](https://github.com/wsw0108/egg-catbox/issues) 异步交流。

## License

[MIT](LICENSE)
