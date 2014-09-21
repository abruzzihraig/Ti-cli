var assert = require('chai').assert;
var read = require('fs').readFileSync;
var ti_cli = require('..');

var input_arg = 'input.ti';
var input_dir = __dirname;
var expect = read(__dirname + '/expect.css', 'utf8').trim();

describe('compare two files between source & yields', function() {
    it('should equivalent which two css files', function() {
        ti_cli.source_arg = input_arg;
        var compiled = ti_cli.read_file(input_dir);
        assert.equal(compiled, expect);
    });
});


