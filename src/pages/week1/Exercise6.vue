<template>
  <ExerciseContainer>
    <h2>Bar Chart using D3.js</h2>
    <svg class="bar-chart" />
  </ExerciseContainer>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onMounted } from 'vue';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';

onMounted(() => {
  const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

  const svgWidth = 500;
  const svgHeight = 300;
  const axisPadding = 30;

  const svg = d3.select('svg');

  // y-scale for placing bars across the height
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset) ?? 0])
    .range([svgHeight - axisPadding * 2, 0]);

  // x-scales for placing bars across the width
  const xScale = d3
    .scaleBand()
    .domain(dataset.map((_, i) => i.toString()))
    .range([axisPadding, svgWidth - axisPadding])
    .padding(0.1);

  // Add x and y axes
  const xAxis = d3.axisBottom(xScale).tickFormat((_, i) => (i + 1).toString());
  const yAxis = d3.axisLeft(yScale);

  svg
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(0, ${svgHeight - axisPadding})`)
    .call(xAxis);

  svg
    .append('g')
    .attr('transform', `translate(${axisPadding}, ${axisPadding})`)
    .call(yAxis);

  // Build the bar chart
  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (_, i) => xScale(i.toString())!)
    .attr('y', (d) => yScale(d) + axisPadding)
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => svgHeight - axisPadding * 2 - yScale(d))
    .attr('fill', '#e10019');

  // Add labels to the bars
  svg
    .selectAll('.bar-label')
    .data(dataset)
    .enter()
    .append('text')
    .attr('class', 'bar-label')
    .text((d) => d)
    .attr('x', (_, i) => xScale(i.toString())! + xScale.bandwidth() / 2)
    .attr('y', (d) => yScale(d) - 5 + +axisPadding)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black');
});
</script>

<style>
.bar-chart {
  background-color: #dcdcdc;
  overflow: visible;
}

.bar-label {
  font-size: 14px;
}
</style>
