<template>
  <svg id="wahlergebnis-bar-chart" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { PartyResult } from 'src/models/wahlergebnis';
import { SvgConfig } from 'src/models/svgConfigs';
import * as d3 from 'd3';
import { getColorForParty } from 'src/models/partyColors';

interface WahlkreisErgebnisBarChartProps {
  partyResults: PartyResult[];
}

const props = defineProps<WahlkreisErgebnisBarChartProps>();
const redrawFunctionRef = ref<() => void>(() => {});

function drawData() {
  const svgConfig = new SvgConfig(700, 700, {
    top: 40,
    right: 10,
    bottom: 20,
    left: 50,
    xlabel: 20,
    ylabel: 20,
  });

  const yMax = 50;

  const yScaling = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([svgConfig.innerHeight, 0]);

  const xScaling = d3
    .scaleBand<string>()
    .domain(props.partyResults.map((d) => d.party))
    .range([0, svgConfig.innerWidth])
    .padding(0.1);

  const svg = d3
    .select<SVGSVGElement, unknown>('#wahlergebnis-bar-chart')
    .attr('width', svgConfig.svgWidth)
    .attr('height', svgConfig.svgHeight);

  const plot = svg
    .append('g')
    .attr(
      'transform',
      `translate(${svgConfig.margin.left + svgConfig.margin.xlabel}, ${
        svgConfig.margin.top
      })`
    );

  plot
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${svgConfig.innerHeight})`)
    .call(d3.axisBottom(xScaling).tickSize(0).tickPadding(6));

  plot.append('g').call(d3.axisLeft(yScaling));

  const barsGroup = plot.append('g').attr('class', 'bars');

  function redrawRects() {
    const bars = barsGroup
      .selectAll<SVGRectElement, PartyResult>('rect')
      .data(props.partyResults, (d) => d.party);

    // Update existing bars
    bars
      .transition()
      .duration(500)
      .attr('y', (d) => yScaling(d.votesPercent))
      .attr('height', (d) => svgConfig.innerHeight - yScaling(d.votesPercent))
      .attr('fill', (d) => getColorForParty(d.party));

    // Add new bars
    bars
      .enter()
      .append('rect')
      .attr('x', (d) => xScaling(d.party)!)
      .attr('y', yScaling(0))
      .attr('width', xScaling.bandwidth())
      .attr('height', 0)
      .attr('fill', (d) => getColorForParty(d.party))
      .transition()
      .duration(500)
      .attr('y', (d) => yScaling(d.votesPercent))
      .attr('height', (d) => svgConfig.innerHeight - yScaling(d.votesPercent));

    // Remove old bars
    bars
      .exit()
      .transition()
      .duration(500)
      .attr('height', 0)
      .attr('y', yScaling(0))
      .remove();

    // Handle labels
    const labels = barsGroup
      .selectAll<SVGTextElement, PartyResult>('text')
      .data(props.partyResults, (d) => d.party);

    // Update existing labels
    labels
      .transition()
      .duration(500)
      .attr('x', (d) => xScaling(d.party)! + xScaling.bandwidth() / 2)
      .attr('y', (d) => yScaling(d.votesPercent) - 5) // Position above the bar
      .text((d) => `${d.votesPercent.toFixed(1)}%`);

    // Add new labels
    labels
      .enter()
      .append('text')
      .attr('x', (d) => xScaling(d.party)! + xScaling.bandwidth() / 2)
      .attr('y', yScaling(0)) // Start at the bottom
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .text((d) => `${d.votesPercent.toFixed(1)}%`)
      .transition()
      .duration(500)
      .attr('y', (d) => yScaling(d.votesPercent) - 5); // Final position above the bar

    // Remove old labels
    labels.exit().transition().duration(500).attr('y', yScaling(0)).remove();
  }

  redrawRects();
  return redrawRects;
}

onMounted(() => {
  const redrawRects = drawData();
  redrawFunctionRef.value = redrawRects;
});

watch(
  () => props.partyResults,
  () => {
    redrawFunctionRef.value();
  }
);
</script>

<style scoped></style>
