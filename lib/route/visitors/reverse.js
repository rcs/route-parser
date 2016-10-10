'use strict';

var createVisitor = require('./create_visitor');

/**
 * Visitor for the AST to construct a path with filled in parameters
 * @class ReverseVisitor
 * @borrows Visitor-visit
 */
var ReverseVisitor = createVisitor({
  Concat: function (node, context) {
    var childResults = node.children
      .map(function (child) {
        return this.visit(child, context);
      }.bind(this));

    if (childResults.some(function (c) { return c === false; })) {
      return false;
    }
    return childResults.join('');
  },

  Literal: function (node) {
    return decodeURI(node.props.value);
  },

  Splat: function (node, context) {
    if (typeof context[node.props.name] === 'undefined') {
      return false;
    }
    return context[node.props.name];
  },

  Param: function (node, context) {
    if (typeof context[node.props.name] === 'undefined') {
      return false;
    }
    return context[node.props.name];
  },

  Optional: function (node, context) {
    var childResult = this.visit(node.children[0], context);
    if (childResult) {
      return childResult;
    }

    return '';
  },

  Root: function (node, context) {
    context = context || {};
    var childResult = this.visit(node.children[0], context);
    if (childResult === false || typeof childResult === 'undefined') {
      return false;
    }
    return encodeURI(childResult);
  }
});

module.exports = ReverseVisitor;
