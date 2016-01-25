
'use strict';

let babel = require('..');
let chai = require('chai');
let convert = require('convert-source-map');
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
      .then(function (build) {
        let file = build.tree.getFile(entry);
        assert.deepEqual(exec(file), { a: 1 });
      });
  });

  context('with options', function () {
    context('.extensions', function () {
      it('should convert other file types into js', function () {
        let entry = fixture('extensions/index.es');

        return mako()
          .use(text('es'))
          .use(babel({ extensions: 'es' }))
          .use(js())
          .build(entry)
          .then(function (build) {
            let file = build.tree.getFile(entry);
            assert.equal(file.type, 'js');
          });
      });
    });

    context('.sourceMaps', function () {
      it('should include an inline source-map', function () {
        let entry = fixture('simple/index.js');

        return mako()
          .use(text('js'))
          .use(babel({ sourceMaps: true }))
          .analyze(entry)
          .then(function (build) {
            let file = build.tree.getFile(entry);
            assert.isTrue(convert.commentRegex.test(file.contents));
          });
      });
    });
  });
});

/**
 * Execute the JS string in a new context
 * @param  {String} code javascript string
 * @return {Mixed} value
 */
function exec(file) {
  return vm.runInNewContext(file.contents)(file.id);
}
