'use strict';

var _ = require('./lodash');
var addLabel = require('./label/add-label');
var util = require('./util');
var d3 = require('./d3');

module.exports = createEdgeLabels;

function createEdgeLabels(selection, g) {
  var svgEdgeLabels = selection.selectAll('g.edgeLabel').data(g.edges(), function (e) {
    return util.edgeToId(e);
  }).classed('update', true);

  svgEdgeLabels.selectAll('*').remove();
  svgEdgeLabels.enter().append('g').classed('edgeLabel', true).style('opacity', 0);
  svgEdgeLabels.each(function (e) {
    var edge = g.edge(e);
    var label = addLabel(d3.select(this), g.edge(e), 0, 0).classed('label', true);
    var bbox = label.node().getBBox();

    if (edge.labelId) {
      label.attr('id', edge.labelId);
    }
    if (!_.has(edge, 'width')) {
      edge.width = bbox.width;
    }
    if (!_.has(edge, 'height')) {
      edge.height = bbox.height;
    }
  });

  util.applyTransition(svgEdgeLabels.exit(), g).style('opacity', 0).remove();

  return svgEdgeLabels;
}