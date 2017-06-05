'use strict'

const intersectRect = require('./intersect/intersect-rect')
const intersectEllipse = require('./intersect/intersect-ellipse')
const intersectCircle = require('./intersect/intersect-circle')
const intersectPolygon = require('./intersect/intersect-polygon')

module.exports = {
  rect: rect,
  ellipse: ellipse,
  circle: circle,
  diamond: diamond
}

function rect (parent, bbox, node) {
  var shapeSvg = parent.insert('rect', ':first-child')
        .attr('rx', node.rx)
        .attr('ry', node.ry)
        .attr('x', -bbox.width / 2)
        .attr('y', -bbox.height / 2)
        .attr('width', bbox.width)
        .attr('height', bbox.height)

  node.intersect = function (point) {
    return intersectRect(node, point)
  }

  return shapeSvg
}

function ellipse (parent, bbox, node) {
  let rx = bbox.width / 2
  let ry = bbox.height / 2
  let shapeSvg = parent.insert('ellipse', ':first-child')
      .attr('x', -bbox.width / 2)
      .attr('y', -bbox.height / 2)
      .attr('rx', rx)
      .attr('ry', ry)

  node.intersect = function (point) {
    return intersectEllipse(node, rx, ry, point)
  }

  return shapeSvg
}

function circle (parent, bbox, node) {
  let r = Math.max(bbox.width, bbox.height) / 2
  let shapeSvg = parent.insert('circle', ':first-child')
        .attr('x', -bbox.width / 2)
        .attr('y', -bbox.height / 2)
        .attr('r', r)

  node.intersect = function (point) {
    return intersectCircle(node, r, point)
  }

  return shapeSvg
}

// Circumscribe an ellipse for the bounding box with a diamond shape. I derived
// the function to calculate the diamond shape from:
// http://mathforum.org/kb/message.jspa?messageID=3750236
function diamond (parent, bbox, node) {
  let w = (bbox.width * Math.SQRT2) / 2
  let h = (bbox.height * Math.SQRT2) / 2
  let points = [
        { x: 0, y: -h },
        { x: -w, y: 0 },
        { x: 0, y: h },
        { x: w, y: 0 }
  ]
  let shapeSvg = parent.insert('polygon', ':first-child')
        .attr('points', points.map(function (p) { return p.x + ',' + p.y }).join(' '))

  node.intersect = function (p) {
    return intersectPolygon(node, points, p)
  }

  return shapeSvg
}
