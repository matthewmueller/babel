
'use strict';

let babel = require('..');
let chai = require('chai');
let js = require('mako-js');
let mako = require('mako');
let path = require('path');
let text = require('mako-text');
let vm = require('vm');

chai.use(require('chai-as-promised'));
let assert = chai.assert;
let fixture = path.resolve.bind(path, __dirname, 'fixtures');

describe('babel plugin', function () {
  it('should transpile the file', function () {
    let entry = fixture('simple/index.js');

    return mako()
      .use(text('js'))
      .use(babel())
      .use(js())
      .build(entry)
      .then(function (tree) {
        let file = tree.getFile(entry);
        assert.strictEqual(exec(file.contents), true);
      });
  });
});

function exec(code) {
  return vm.runInNewContext(`${code}(1)`);
}
