<template>
  <ExerciseContainer>
    <h2>Line Chart</h2>
    <q-spinner-audio v-if="loading" color="primary" size="10em" />

    <svg id="plotContainer" />
  </ExerciseContainer>
</template>

<script setup lang="ts">
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';

const api =
  'https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-12-31';

const loading = ref(true);

interface BitcoinData {
  date: Date;
  price: number;
}

function parseData(data: Record<string, number>): BitcoinData[] {
  return Object.entries(data).map(([date, price]) => ({
    date: new Date(date),
    price,
  }));
}

function drawChart(dataset: BitcoinData[]) {
  const svgWidth = 600;
  const svgHeight = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const svg = d3
    .select('#plotContainer')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  const g = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const xScale = d3.scaleTime().rangeRound([0, width]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);

  var line = d3
    .line<BitcoinData>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price));

  xScale.domain(d3.extent(dataset, (d) => d.date) as [Date, Date]);
  yScale.domain([0, d3.max(dataset, (d) => d.price) || 0]);
  g.append('path')
    .datum(dataset)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line);

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  g.append('g').call(d3.axisLeft(yScale));
}

onMounted(() => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const parsedData: BitcoinData[] = parseData(data.bpi);
      loading.value = false;
      drawChart(parsedData);
    });
});
</script>

<style scoped></style>
