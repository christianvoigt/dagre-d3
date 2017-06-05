'use strict';

var _ = require('./lodash');
var addLabel = require('./label/add-label');
var util = require('./util');
var d3 = require('./d3');

module.exports = createNodes;

function createNodes(selection, g, shapes) {
  var simpleNodes = g.nodes().filter(function (v) {
    return !util.isSubgraph(g, v);
  });
  var svgNodes = selection.selectAll('g.node').data(simpleNodes, function (v) {
    return v;
  }).classed('update', true);

  svgNodes.selectAll('*').remove();
  svgNodes.enter().append('g').attr('class', 'node').style('opacity', 0);
  svgNodes.each(function (v) {
    var node = g.node(v);
    var thisGroup = d3.select(this);
    var labelGroup = thisGroup.append('g').attr('class', 'label');
    var labelDom = addLabel(labelGroup, node);
    var shape = shapes[node.shape];
    var bbox = _.pick(labelDom.node().getBBox(), 'width', 'height');

    node.elem = this;

    if (node.id) {
      thisGroup.attr('id', node.id);
    }
    if (node.labelId) {
      labelGroup.attr('id', node.labelId);
    }
    util.applyClass(thisGroup, node['class'], (thisGroup.classed('update') ? 'update ' : '') + 'node');

    if (_.has(node, 'width')) {
      bbox.width = node.width;
    }
    if (_.has(node, 'height')) {
      bbox.height = node.height;
    }

    bbox.width += node.paddingLeft + node.paddingRight;
    bbox.height += node.paddingTop + node.paddingBottom;
    labelGroup.attr('transform', 'translate(' + (node.paddingLeft - node.paddingRight) / 2 + ',' + (node.paddingTop - node.paddingBottom) / 2 + ')');

    var shapeSvg = shape(d3.select(this), bbox, node);
    util.applyStyle(shapeSvg, node.style);

    var shapeBBox = shapeSvg.node().getBBox();
    node.width = shapeBBox.width;
    node.height = shapeBBox.height;
  });

  util.applyTransition(svgNodes.exit(), g).style('opacity', 0).remove();

  return svgNodes;
}