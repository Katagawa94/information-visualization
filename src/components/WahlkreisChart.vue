<template>
  <svg id="wahlkreis-chart" />
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { Feature } from 'geojson';
import { getColorForParty } from 'src/models/partyColors';
import { SvgConfig } from 'src/models/svgConfigs';
import {
  ElectionData,
  ElectionDistrictData,
  getWinnerPartyByElectionDistrictName,
} from 'src/models/wahlergebnis';
import { loadGeoJSON } from 'src/scripts/jsonParser/geoJsonParser';
import { onMounted } from 'vue';

interface WahlkreisChartProps {
  wahlergebnis: ElectionData;
}

const props = defineProps<WahlkreisChartProps>();

const emit = defineEmits<{
  (
    event: 'update:selectedWahlkreis',
    selected: ElectionDistrictData | undefined
  ): void;
}>();

function handleClick(event: Event, data: Feature) {
  console.log(event);
  const eventWahlkreis = props.wahlergebnis.electionDistrictResults.find((d) =>
    d.electionDistrict.name.includes(data.properties?.LWK_NAME)
  );

  d3.selectAll('.selected-field')
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .classed('selected-field', false);

  d3.select(event.target as SVGPathElement)
    .classed('selected-field', true)
    .attr('stroke', 'red')
    .raise();

  if (eventWahlkreis) {
    emit('update:selectedWahlkreis', eventWahlkreis);
  }
}

function handleMouseOver(event: Event) {
  d3.select(event.target as SVGPathElement)
    .transition()
    .duration(50)
    .attr('opacity', '.70');
}

function handleMouseOut(event: Event) {
  d3.select(event.target as SVGPathElement)
    .transition()
    .duration(50)
    .attr('opacity', '1');
}

async function drawData() {
  const svgConfig = new SvgConfig(550, 700, {
    top: 40,
    right: 10,
    bottom: 20,
    left: 50,
    xlabel: 20,
    ylabel: 20,
  });

  const plotContainer = d3
    .select('#wahlkreis-chart')
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

  const geoData = await loadGeoJSON();

  const projection = d3
    .geoMercator()
    .fitSize([svgConfig.innerWidth, svgConfig.innerHeight], geoData);

  const geopath = d3.geoPath().projection(projection);

  plot
    .append('g')
    .attr('class', 'region')
    .selectAll('path')
    .data(geoData.features)
    .enter()
    .append('path')
    .attr('d', geopath)
    .attr('class', (d) => 'LWK' + d.properties!.LWK)
    .attr('fill', (d) =>
      getColorForParty(
        getWinnerPartyByElectionDistrictName(
          d.properties!.LWK_NAME,
          props.wahlergebnis
        )
      )
    )
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('stroke-linejoin', 'round')
    .on('click', (event, data) => handleClick(event, data))
    .on('mouseover', (event) => handleMouseOver(event))
    .on('mouseout', (event) => handleMouseOut(event));
}

onMounted(async () => {
  await drawData();
});
</script>

<style scoped></style>
