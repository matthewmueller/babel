
'use strict';

let core = require('babel-core');
let debug = require('debug')('mako-babel');
let defaults = require('defaults');
let path = require('path');

let compile = core.transform;
let shouldIgnore = core.util.shouldIgnore;

const pwd = process.cwd();
const relative = abs => path.relative(pwd, abs);


module.exports = function (options) {
  debug('initialize %j', options);

  let config = defaults(options, {
    extensions: 'js',
    ignore: [ /node_modules/i ],
    only: null
  });

  return function (mako) {
    mako.postread(config.extensions, function babel(file) {
      if (shouldIgnore(file.path, config.ignore, config.only)) return;

      debug('compiling %s', relative(file.path));
      let results = compile(file.contents, {
        filename: file.path,
        sourceMaps: 'inline'
      });

      file.contents = results.code;
      file.type = 'js';
    });
  };
};
