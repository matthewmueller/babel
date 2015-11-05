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

This plugin does not expose a lot of configuration, as using a `.babelrc` file is encouraged.

## Dependencies

This requires some sort of read plugin that populates `file.contents` with a string.

## Effects

For each file processed, it will compile `file.contents` from input ES6 into ES5 w/ CommonJS modules.
Currently, this plugin is designed to be compatible with [mako-js](https://github.com/makojs/js), but
interoperability will come in the future.

## Use Cases

This is a great plugin for working with ES6 code.
