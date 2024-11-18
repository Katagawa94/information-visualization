<template>
  <ExerciseContainer>
    <h2>
      Students from a given country <br />
      studying abroad - Bar
    </h2>
    <q-spinner-audio v-if="loading" color="primary" size="10em" />
    <svg id="plotContainer" />
  </ExerciseContainer>
</template>

<script setup lang="ts">
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
import * as d3 from 'd3';
import { SvgConfig } from 'src/components/models';
import { onMounted, ref } from 'vue';
import { SdmxParser } from 'src/scripts/sdmxDataParser';

const loading = ref(true);

const api =
  'https://data.un.org/ws/rest/data/UIS,DF_UNData_UIS,1.1/.ED_FSOABS.....FRA+DEU+NOR./ALL/?detail=full&dimensionAtObservation=TIME_PERIOD';

interface DataValue {
  refArea: string;
  year: string;
  value: number;
}

function parseData(parser: SdmxParser): DataValue[] {
  const data: DataValue[] = [];
  const years = parser.getTimePeriods().map((tp) => tp.name);

  const countries = parser.getRefAreas();

  countries.forEach((country) => {
    const observations = parser.getObservationsByRefArea(country.id);
    const values = observations
      ? Object.values(observations).map((obs) => obs[0])
      : [];
    values.forEach((value, i) => {
      data.push({
        refArea: country.name,
        year: years[i],
        value: value,
      });
    });
  });

  return data;
}

onMounted(async () => {
  fetch(api, {
    method: 'GET',
    headers: {
      Accept: 'text/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const parser = new SdmxParser(JSON.stringify(data));
      const dataSets = parseData(parser);
      loading.value = false;
      drawChart(dataSets);
    });
});

function drawChart(data: DataValue[]): void {
  const svgConfig: SvgConfig = new SvgConfig(600, 400, {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
    xlabel: 20,
    ylabel: 20,
  });

  const fx = d3
    .scaleBand()
    .domain(new Set(data.map((d) => d.year.toString())))
    .rangeRound([0, svgConfig.innerWidth])
    .padding(0.1);

  const refAreas = new Set(data.map((d) => d.refArea.toString()));

  const color = d3
    .scaleOrdinal()
    .domain(refAreas)
    .range(d3.schemeSpectral[refAreas.size])
    .unknown('#ccc');

  const xScale = d3
    .scaleBand()
    .domain(refAreas)
    .rangeRound([0, fx.bandwidth()])
    .padding(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) as number])
    .nice()
    .rangeRound([svgConfig.innerHeight, 0]);

  const plotContainer = d3
    .select('#plotContainer')
    .attr('width', svgConfig.svgWidth)
    .attr('height', svgConfig.svgHeight);

  const plot = plotContainer
    .append('g')
    .attr(
      'transform',
      `translate(${svgConfig.margin.left + svgConfig.margin.xlabel}, ${
        svgConfig.margin.top
      })`
    );

  plot
    .append('g')
    .attr('transform', `translate(0, ${svgConfig.innerHeight})`)
    .call(d3.axisBottom(fx).tickSizeOuter(0))
    .call((g) => {
      g.selectAll('.domain').remove();
      // g.selectAll('.tick text').remove();
    });

  plot.append('g').call(d3.axisLeft(yScale));

  plot
    .append('g')
    .selectAll('circle')
    .data(d3.groups(data, (d) => d.year))
    .join('g')
    .attr('transform', ([year]) => `translate(${fx(year.toString())},0)`)
    .selectAll()
    .data(([, values]) => values)
    .join('rect')
    .attr('x', (d) => xScale(d.refArea) as number)
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => svgConfig.innerHeight - yScale(d.value))
    .attr('fill', (d) => color(d.refArea) as string);
}
</script>

<style scoped></style>
