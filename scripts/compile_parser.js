#!/usr/bin/env node
var fs = require('fs');

var jison = require('jison'),
    grammar = require('../lib/route/grammar.js'),
    parser = new jison.Parser(grammar);

fs.writeFileSync(
  __dirname + '/../lib/route/compiled-grammar.js',
  parser.generate()
);