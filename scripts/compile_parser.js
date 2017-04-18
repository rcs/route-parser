#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var jison = require('jison');
var Lexer = require('jison-lex');
var grammar = require('../lib/route/grammar.js');
var parser = new jison.Parser(grammar);

// eslint-disable-next-line no-underscore-dangle
parser.lexer = new Lexer(grammar.lex, null, grammar.terminals_);

// Remove _token_stack label manually until fixed in jison:
// https://github.com/zaach/jison/issues/351
// https://github.com/zaach/jison/pull/352
var compiledGrammar = parser.generate({ moduleType: 'js' }).replace(/_token_stack:\s?/, '');


fs.writeFileSync(
  path.join(__dirname, '/../lib/route/compiled-grammar.js'),
  [
    compiledGrammar,
    "\n\n\nif (typeof require !== 'undefined' && typeof exports !== 'undefined') {",
    '\nexports.parser = parser;',
    '\nexports.Parser = parser.Parser;',
    '\nexports.parse = function () { return parser.parse.apply(parser, arguments); };',
    '\n}'
  ].join('')
);
