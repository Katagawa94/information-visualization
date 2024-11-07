<template>
  <ExerciseContainer>
    <h2>
      Students from a given country <br />
      studying abroad - Scatter
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

interface Observation {
  refArea: string;
  observationValues: number[];
}

interface DataSet {
  timePeriods: Date[];
  observations: Observation[];
}

function parseData(data: SdmxParser): DataSet {
  const years = data.getTimePeriods().map((tp) => new Date(tp.id));
  const dataset: DataSet = { timePeriods: years, observations: [] };

  const countries = data.getRefAreas();

  countries.forEach((country) => {
    const observations = data.getObservationsByRefArea(country.id);
    const values = observations
      ? Object.values(observations).map((obs) => obs[0])
      : [];
    dataset.observations.push({
      refArea: country.name,
      observationValues: values,
    });
  });

  return dataset;
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

function drawChart(dataSet: DataSet) {
  const svgConfig: SvgConfig = new SvgConfig(600, 400, {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
    xlabel: 20,
    ylabel: 20,
  });

  const maxObservationValue = Math.max(
    ...dataSet.observations.flatMap(
      (observation) => observation.observationValues
    )
  );

  const xScale = d3.scaleTime().rangeRound([0, svgConfig.width]);
  const yScale = d3.scaleLinear().rangeRound([svgConfig.height, 0]);

  xScale.domain(d3.extent(dataSet.timePeriods, (d) => d) as [Date, Date]);
  yScale.domain([0, maxObservationValue]);

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
    .attr('transform', `translate(0, ${svgConfig.height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  plot.append('g').call(d3.axisLeft(yScale));

  plot
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', svgConfig.width / 2)
    .attr('y', svgConfig.svgHeight - svgConfig.margin.top)
    .text('Year');

  plot
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('x', 0 - svgConfig.height / 2)
    .attr('y', 0 - svgConfig.margin.left)
    .text('Students Abroad');


  const colors = ['#69b3a2', '#ff6347', '#4682b4'];

  dataSet.observations.forEach((observation, j) => {
    const color = colors[j % colors.length];

    plot
      .append('g')
      .selectAll('circle')
      .data(observation.observationValues)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => xScale(dataSet.timePeriods[i]))
      .attr('cy', (d) => yScale(d))
      .attr('r', 4.0)
      .style('fill', color);
  });
}
</script>

<style scoped></style>
