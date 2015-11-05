
'use strict';

let compile = require('babel-core').transform;
let debug = require('debug')('mako-babel');
let defaults = require('defaults');

module.exports = function (options) {
  let config = defaults(options, { extensions: 'js' });
  debug('initialize %j', config);

  return function (mako) {
    mako.postread(config.extensions, function babel(file) {
      debug('compiling %s', file.path);
      let results = compile(file.contents, { filename: file.path });
      file.contents = results.code;
      // TODO: sourcemaps
    });
  };
};
