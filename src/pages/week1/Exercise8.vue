<template>
  <ExerciseContainer>
    <h2>Pie Chart</h2>
    <svg class="pie-chart" />
  </ExerciseContainer>
</template>

<script setup lang="ts">
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
import { onMounted } from 'vue';
import * as d3 from 'd3';

interface PieChartData {
  label: string;
  value: number;
}

onMounted(() => {
  const data: PieChartData[] = [
    { label: 'Android', value: 40.11 },
    { label: 'Windows', value: 36.69 },
    { label: 'iOS', value: 13.06 },
  ];

  const svgWidth = 500;
  const svgHeight = 500;
  const radius = Math.min(svgWidth, svgHeight) / 2;

  const svg = d3.select('.pie-chart');

  svg.attr('width', svgWidth).attr('height', svgHeight);

  const group = svg
    .append('g')
    .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie<PieChartData>().value((d) => d.value);

  const path = d3
    .arc<d3.PieArcDatum<PieChartData>>()
    .innerRadius(0)
    .outerRadius(radius);

  const arc = group.selectAll('.arc').data(pie(data)).enter().append('g');

  arc
    .append('path')
    .attr('d', path)
    .attr('fill', (d) => color(d.data.label));

  arc
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('text')
    .attr('transform', (d) => `translate(${path.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text((d) => d.data.label)
    .style('font-family', 'Arial');
});
</script>

<style scoped></style>
