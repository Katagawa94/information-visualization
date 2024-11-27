<template>
  <svg id="wahlergebnis-bar-chart" />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { PartyResult, ElectionDistrictData } from 'src/models/wahlergebnis';
import { SvgConfig } from 'src/models/svgConfigs';
import * as d3 from 'd3';
import { getColorForParty, parties } from 'src/models/partyColors';

interface WahlkreisErgebnisBarChartProps {
  wahlkreis: ElectionDistrictData;
}

const props = defineProps<WahlkreisErgebnisBarChartProps>();

function clearSvg() {
  d3.select('#wahlergebnis-bar-chart').selectAll('*').remove();
}

function drawData() {
  const svgConfig = new SvgConfig(700, 700, {
    top: 40,
    right: 10,
    bottom: 20,
    left: 50,
    xlabel: 20,
    ylabel: 20,
  });

  // const yMax = d3.max(props.wahlkreis.partyResults, (d) => d.votesPercent) ?? 0;
  const yMax = 50;

  const chartParties = [] as PartyResult[];

  parties.forEach((party) => {
    const partyResult = props.wahlkreis.partyResults.find((d) =>
      d.party.includes(party)
    );
    if (partyResult) {
      chartParties.push(partyResult);
    }
  });

  const sonstige = {} as PartyResult;
  sonstige.party = 'Sonstige';
  const votesPercent = chartParties.reduce((acc, d) => acc + d.votesPercent, 0);
  sonstige.votesPercent = 100 - votesPercent;

  chartParties.push(sonstige);

  const yScaling = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([svgConfig.innerHeight, 0]);

  const xScaling = d3
    .scaleBand()
    .domain(chartParties.map((d) => d.party))
    .range([0, svgConfig.innerWidth])
    .padding(0.1);

  const plotContainer = d3
    .select('#wahlergebnis-bar-chart')
    .attr('width', svgConfig.svgWidth)
    .attr('height', svgConfig.svgHeight);

  const plot = plotContainer
    .append('g')
    .attr(
      'transform',
      `translate(${svgConfig.margin.left + svgConfig.margin.xlabel} , ${
        svgConfig.margin.top
      })`
    );

  plot
    .selectAll('rect')
    .data(chartParties)
    .enter()
    .append('rect')
    .attr('x', (d) => xScaling(d.party)!)
    .attr('y', (d) => yScaling(d.votesPercent))
    .attr('width', xScaling.bandwidth())
    .attr('height', (d) => svgConfig.innerHeight - yScaling(d.votesPercent))
    .attr('fill', (d) => getColorForParty(d.party));

  plot
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${svgConfig.innerHeight})`)
    .call(d3.axisBottom(xScaling).tickSize(0).tickPadding(6));

  plot.append('g').call(d3.axisLeft(yScaling));
}

watch(
  () => props.wahlkreis,
  () => {
    clearSvg();
    drawData();
  }
);

onMounted(() => {
  drawData();
});
</script>

<style scoped></style>
