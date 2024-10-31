<template>
  <ExerciseContainer>
    <h2>Playing with forms</h2>
    <svg id="drawingBoard" />
  </ExerciseContainer>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
import { onMounted } from 'vue';

onMounted(() => {
  const svgWidth = 500;
  const svgHeight = 500;

  const svg = d3.select('#drawingBoard');

  svg.attr('width', svgWidth).attr('height', svgHeight);

  const ballBorder = 10;
  const innerBallOutline = 30;
  const innerBallRadius = 50;

  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 500)
    .attr('height', 500)
    .attr('fill', 'black');

  svg
    .append('rect')
    .attr('x', ballBorder)
    .attr('y', ballBorder)
    .attr('width', svgWidth - ballBorder * 2)
    .attr('height', svgHeight / 2 - ballBorder)
    .attr('fill', '#e10019');
  svg
    .append('rect')
    .attr('x', ballBorder)
    .attr('y', svgHeight / 2)
    .attr('width', svgWidth - ballBorder * 2)
    .attr('height', svgHeight / 2 - ballBorder)
    .attr('fill', 'white');

  svg
    .append('rect')
    .attr('x', ballBorder)
    .attr('y', svgHeight / 2 - innerBallOutline / 2)
    .attr('width', svgWidth - ballBorder * 2)
    .attr('height', innerBallOutline)
    .attr('fill', 'black');

  svg
    .append('circle')
    .attr('cx', svgWidth / 2)
    .attr('cy', svgWidth / 2)
    .attr('r', innerBallOutline + innerBallRadius)
    .attr('fill', 'black');

  svg
    .append('circle')
    .attr('cx', svgWidth / 2)
    .attr('cy', svgWidth / 2)
    .attr('r', innerBallRadius)
    .attr('fill', 'white');
});
</script>

<style scoped></style>
