#!/usr/bin/env node
var fs = require('fs');

var jison = require('jison'),
    grammar = require('../lib/route/grammar.js'),
    parser = new jison.Parser(grammar);


var compiledGrammar = parser.generate({moduleType: 'js'});


fs.writeFileSync(
  __dirname + '/../lib/route/compiled-grammar.js',
  [
    compiledGrammar,
    "\n\n\nif (typeof require !== 'undefined' && typeof exports !== 'undefined') {",
    "\nexports.parser = parser;",
    "\nexports.Parser = parser.Parser;",
    "\nexports.parse = function () { return parser.parse.apply(parser, arguments); };",
    "\n}"
  ].join('')
);
