#! /usr/bin/env node
var exec = require('child_process').exec;
var read = require('fs').readFileSync;
var write = require('fs').writeFileSync;
var path = require('path');
var ti = require('ti-preprocessor')();

var stdin = process.argv.slice(2);
var source_url = stdin[0] || '';
var yields_url = stdin[1] || path.basename(source_url, '.ti') + '.css';
if(source_url === '') throw new Error('There is must be a source ti file');

exec('pwd', function(err, stdout, stderr) {
    if(err) throw err;
    if(stderr) throw stderr;
    var compiled = read_file(stdout);
    write_file(yields_url, compiled);
});

function read_file(dir) {
    var source_content = read(path.join(dir.trim(), source_url.trim()), 'utf-8');
    var yields_content = ti(source_content);
    return yields_content;
}

function write_file(dir, content) {
    write(dir, content);
}
