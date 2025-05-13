const dscc = require('@google/dscc');
const d3 = require('d3');

function drawViz(data) {
  const width = 600;
  const height = 400;
  const svg = d3.select('#viz').html('').append('svg')
    .attr('width', width)
    .attr('height', height);

  const dataset = data.tables.DEFAULT.map(d => ({
    stage: d.dimensions[0],
    value: d.metrics[0]
  }));

  const total = dataset[0].value;
  const barHeight = 40;
  const gap = 20;

  dataset.forEach((d, i) => {
    const barWidth = (d.value / total) * width;
    svg.append('rect')
      .attr('x', 0)
      .attr('y', i * (barHeight + gap))
      .attr('width', barWidth)
      .attr('height', barHeight)
      .attr('fill', '#4682b4');

    svg.append('text')
      .attr('x', 10)
      .attr('y', i * (barHeight + gap) + 25)
      .text(`${d.stage}: ${d.value}`);
  });
}

dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
