const util = require('./util')
const addLabel = require('./label/add-label')
const d3 = require('./d3')

module.exports = createClusters

function createClusters (selection, g) {
  let clusters = g.nodes().filter(function (v) { return util.isSubgraph(g, v) })
  let svgClusters = selection.selectAll('g.cluster')
        .data(clusters, function (v) { return v })

  svgClusters.selectAll('*').remove()
  svgClusters.enter()
    .append('g')
      .attr('class', 'cluster')
      .attr('id', function (v) {
        let node = g.node(v)
        return node.id
      })
      .style('opacity', 0)

  util.applyTransition(svgClusters, g)
    .style('opacity', 1)

  svgClusters.each(function (v) {
    let node = g.node(v)
    let thisGroup = d3.select(this)
    d3.select(this).append('rect')
    util.applyClass(thisGroup, node['class'], 'cluster')

    var labelGroup = thisGroup.append('g').attr('class', 'label')
    addLabel(labelGroup, node, node.clusterLabelPos)
  })

  svgClusters.selectAll('rect').each(function (c) {
    var node = g.node(c)
    var domCluster = d3.select(this)
    util.applyStyle(domCluster, node.style)
  })

  util.applyTransition(svgClusters.exit(), g)
    .style('opacity', 0)
    .remove()

  return svgClusters
}
