'use strict'

const _ = require('./lodash')
const addLabel = require('./label/add-label')
const util = require('./util')
const d3 = require('./d3')

module.exports = createEdgeLabels

function createEdgeLabels (selection, g) {
  var svgEdgeLabels = selection.selectAll('g.edgeLabel')
    .data(g.edges(), function (e) { return util.edgeToId(e) })
    .classed('update', true)

  svgEdgeLabels.selectAll('*').remove()
  svgEdgeLabels.enter()
    .append('g')
      .classed('edgeLabel', true)
      .style('opacity', 0)
  svgEdgeLabels.each(function (e) {
    let edge = g.edge(e)
    let label = addLabel(d3.select(this), g.edge(e), 0, 0).classed('label', true)
    let bbox = label.node().getBBox()

    if (edge.labelId) { label.attr('id', edge.labelId) }
    if (!_.has(edge, 'width')) { edge.width = bbox.width }
    if (!_.has(edge, 'height')) { edge.height = bbox.height }
  })

  util.applyTransition(svgEdgeLabels.exit(), g)
    .style('opacity', 0)
    .remove()

  return svgEdgeLabels
}
