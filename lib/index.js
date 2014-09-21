#! /usr/bin/env node
var exec = require('child_process').exec;
var read = require('fs').readFileSync;
var write = require('fs').writeFileSync;
var path = require('path');
var ti = require('ti-preprocessor')();

var stdin = process.argv.slice(2);
exports.source_arg = stdin[0] || '';
exports.yields_arg = stdin[1] || path.basename(exports.source_arg, '.ti') + '.css';
if(exports.source_arg === '') throw new Error('There is must be a source ti file');

exec('pwd', function(err, stdout, stderr) {
    if(err) throw err;
    if(stderr) throw stderr;
    var compiled = read_file(stdout);
    write_file(exports.yields_arg, compiled);
});

exports.read_file = function(dir) {
    var source_content = read(path.join(dir.trim(), exports.source_arg.trim()), 'utf-8');
    var yields_content = ti(source_content);
    return yields_content;
}

exports.write_file = function(dir, content) {
    write(dir, content);
}
