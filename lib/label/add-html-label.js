'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var util = require('../util');

module.exports = addHtmlLabel;

function addHtmlLabel(root, node) {
  var fo = root.append('foreignObject').attr('width', '100000');

  var div = fo.append('xhtml:div');
  div.attr('xmlns', 'http://www.w3.org/1999/xhtml');

  var label = node.label;
  switch (typeof label === 'undefined' ? 'undefined' : _typeof(label)) {
    case 'function':
      div.insert(label);
      break;
    case 'object':
      // Currently we assume this is a DOM object.
      div.insert(function () {
        return label;
      });
      break;
    default:
      div.html(label);
  }

  util.applyStyle(div, node.labelStyle);
  div.style('display', 'inline-block'
  // Fix for firefox
  );div.style('white-space', 'nowrap');

  var client = div[0][0].getBoundingClientRect();
  fo.attr('width', client.width).attr('height', client.height);

  return fo;
}