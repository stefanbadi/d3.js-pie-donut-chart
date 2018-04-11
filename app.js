// Data
var data = [25, 25, 25, 25];

//dimensions
var chart_width = 600;
var chart_height = 600;

//colors from schemecat
var color = d3.scaleOrdinal(d3.schemeCategory10);

//pie chart being paint from slices / arcs

// Pie Layout
var pie = d3.pie();

// Arc
var outer_radius = chart_width / 2;
//if 0 = pie chart
var inner_radius = 0;
//if > 0 --> donut chart
var inner_radius = 150;

var arc = d3
  .arc()
  .innerRadius(inner_radius)
  .outerRadius(outer_radius);

//Create SVG Element
var svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

//group arcs, arcs are drawn from center to outwards
var arcs = svg
  .selectAll('g.arc')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr(
    'transform',
    'translate(' + outer_radius + ',' + chart_height / 2 + ')'
  );

//arcs
//give each arc a unique color
arcs
  .append('path')
  .attr('fill', function(d, i) {
    return color(i);
  })
  .attr('d', arc);

//labels
arcs
  .append('text')
  .attr('transform', function(d, i) {
    return 'translate(' + arc.centroid(d) + ')';
  })
  .attr('text-anchor', 'text-middle')
  .text(function(d) {
    return d.value;
  });
