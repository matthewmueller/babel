# mako-babel

> A mako plugin that transpiles ES6 code using [babel](http://babeljs.io/).

[![npm version](https://img.shields.io/npm/v/mako-babel.svg)](https://www.npmjs.com/package/mako-babel)
[![npm dependencies](https://img.shields.io/david/makojs/babel.svg)](https://david-dm.org/makojs/babel)
[![npm dev dependencies](https://img.shields.io/david/dev/makojs/babel.svg)](https://david-dm.org/makojs/babel#info=devDependencies)
[![build status](https://img.shields.io/travis/makojs/babel.svg)](https://travis-ci.org/makojs/babel)

## Usage

```js
var mako = require('mako');
var text = require('mako-text');
var babel = require('mako-babel');
var js = require('mako-js');

mako()
  // read from disk
  .use(text('js'))
  // compile ES6 code
  .use(babel())
  // assemble CommonJS modules
  .use(js())
  // run the builder
  .build('./index.js')
  .then(function () {
    // done!
  });
```

## API

### babel(options)

Available `options` include:
 - `extensions`: a list of extensions to compile. (default: `js`)
 - `only`: a whitelist of files (globs, functions and regex allowed) to compile (takes precedence over `ignore`)
 - `ignore`: a blacklist of files to compile
 - `sourceMaps`: turn on to enable source maps

This plugin does not expose a lot of configuration, as using a `.babelrc` file is encouraged.

**NOTE:** by default, this module ignores anything in `node_modules` by default. Any modules should be precompiled
before being published to NPM. If there is enough demand for it, I will consider adding configuration for other
workflows. (although I will point out it is discouraged by the babel team as far as I can tell)

## Dependencies

This requires some sort of read plugin that populates `file.contents` with a string.

## Effects

For each file processed, it will compile `file.contents` from input ES6 into ES5 w/ CommonJS modules.
Currently, this plugin is designed to be compatible with [mako-js](https://github.com/makojs/js), but
interoperability will come in the future.

If `options.sourceMaps` is turned on, it will include the source-maps inline. This allows the maps to
be picked up by build plugins.
