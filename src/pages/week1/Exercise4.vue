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
  const barPadding = 5;
  const barWidth = svgWidth / dataset.length;

  const svg = d3.select('svg');

  // Build the bar chart
  svg
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('y', (d) => svgHeight - d)
    .attr('height', (d) => d)
    .attr('width', barWidth - barPadding)
    .attr('transform', (d, i) => {
      const translate = [barWidth * i, 0];
      return `translate(${translate})`;
    });

  // Add labels to the bars
  svg
    .selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text((d) => d)
    .attr('y', (d) => svgHeight - d - 2)
    .attr('x', (d, i) => barWidth * i)
    .attr('fill', 'black');
});
</script>

<style>
.bar-chart {
  background-color: #dcdcdc;
}
</style>
