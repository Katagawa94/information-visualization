<template>
  <ExerciseContainer>
    <h2>Stacked and Grouped Bars - GDP of germany</h2>
    <form>
      <label>
        <input
          type="radio"
          name="mode"
          value="grouped"
          @change="changeModeRef!('grouped')"
        />
        Grouped
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="stacked"
          checked
          @change="changeModeRef!('stacked')"
        />
        Stacked
      </label>
    </form>
    <svg id="plotContainer"></svg>
  </ExerciseContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
import { RawData, StackedBarChartData, SvgConfig } from 'src/components/models';

const basePath = import.meta.env.BASE_URL;

const currentMode = ref<'grouped' | 'stacked'>('stacked');

async function loadCSV(): Promise<RawData[]> {
  try {
    const response = await fetch(`${basePath}src/assets/data/dataBip.csv`);

    if (!response.ok) {
      throw new Error('Failed to load CSV');
    }

    const csvText = await response.text();
    const csvParsed = parseCSV(csvText);
    const formattedData = formatCSV(csvParsed);
    return formattedData;
  } catch (error) {
    console.error('Error loading CSV:', error);
  }
  return [];
}

function parseCSV(csvText: string): string[][] {
  const rows = csvText.split('\n');
  const csvData = rows.map((row) => row.split(','));
  return csvData;
}

function formatCSV(csvParsed: string[][]): RawData[] {
  const formattedData = csvParsed.slice(1).map((row) => {
    return {
      group: Number(row[0]),
      series: Number(row[1]),
      value: Number(row[2]),
    };
  });

  const formattedFiltredData = formattedData.filter((d) => {
    return d.group && d.series && d.value;
  });

  return formattedFiltredData;
}

function buildStackedBarChartData(rawData: RawData[]): StackedBarChartData[][] {
  const result: { [key: string]: StackedBarChartData[] } = {};

  for (let i = 0; i < rawData.length; i++) {
    const d = rawData[i];

    if (!result[d.series]) {
      result[d.series] = [];
    }

    result[d.series].push({
      group: d.group,
      series: d.series,
      value: d.value,
      y0: 0,
      y1: d.value,
    });
  }

  const keys = Object.keys(result);

  for (let j = 1; j < keys.length; j++) {
    const series = result[keys[j]];
    for (let i = 0; i < series.length; i++) {
      series[i].y0 = result[keys[j - 1]][i].y1;
      series[i].y1 = series[i].y0 + series[i].value;
    }
  }

  return Object.values(result);
}

async function drawChart() {
  const rawData = await loadCSV();

  const groups = Array.from(new Set(rawData.map((d) => d.group)));
  const seriesData = Array.from(new Set(rawData.map((d) => d.series)));
  const seriesAmount = seriesData.length;

  const svgConfig = new SvgConfig(1400, 700, {
    top: 40,
    right: 10,
    bottom: 20,
    left: 50,
    xlabel: 20,
    ylabel: 20,
  });

  const stackedData = buildStackedBarChartData(rawData);

  const yGroupedMax: number = d3.max(rawData, (d) => d.value) ?? 0;
  const yStackedMax =
    d3.max(stackedData.flatMap((d) => d.map((v) => v.y1))) ?? 0;

  const plotContainer = d3
    .select('#plotContainer')
    .attr('width', svgConfig.svgWidth)
    .attr('height', svgConfig.svgHeight)
    .attr('fill', 'red');

  const plot = plotContainer
    .append('g')
    .attr(
      'transform',
      `translate(${svgConfig.margin.left + svgConfig.margin.xlabel} , ${
        svgConfig.margin.top
      })`
    );

  const xScaling = d3
    .scaleBand<number>()
    .domain(groups)
    .rangeRound([0, svgConfig.innerWidth])
    .padding(0.3);

  const yScaling = d3
    .scaleLinear()
    .domain([0, yStackedMax])
    .range([svgConfig.innerHeight, 0]);

  const color = d3
    .scaleOrdinal(d3.schemeDark2)
    .domain(d3.range(seriesAmount).map(String));

  const series = plot
    .selectAll('.series')
    .data(stackedData)
    .enter()
    .append('g')
    .attr('fill', (d, i) => color(String(i)) as string);

  const rect = series
    .selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('x', (d) => xScaling(d.group)!)
    .attr('y', svgConfig.innerHeight)
    .attr('width', xScaling.bandwidth())
    .attr('height', 0);

  rect
    .transition()
    .delay((d, i) => i * 10)
    .attr('y', (d) => yScaling(d.y1))
    .attr('height', (d) => yScaling(d.y0) - yScaling(d.y1));

  plot
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${svgConfig.innerHeight})`)
    .call(d3.axisBottom(xScaling).tickSize(0).tickPadding(6));

  const yScale = plot.append('g').call(d3.axisLeft(yScaling));

  drawCaption();

  function transitionGrouped() {
    yScaling.domain([0, yGroupedMax]);

    yScale.call(d3.axisLeft(yScaling));

    rect
      .transition()
      .duration(500)
      .delay((_, i) => i * 10)
      .attr(
        'x',
        (d) =>
          xScaling(d.group)! +
          (xScaling.bandwidth() / seriesAmount) * seriesData.indexOf(d.series)
      )
      .attr('width', xScaling.bandwidth() / seriesAmount)
      .transition()
      .attr('y', (d) => yScaling(d.y1 - d.y0))
      .attr('height', (d) => yScaling(0) - yScaling(d.y1 - d.y0));
  }

  function transitionStacked() {
    yScaling.domain([0, yStackedMax]);

    yScale.call(d3.axisLeft(yScaling));

    rect
      .transition()
      .duration(500)
      .delay((_, i) => i * 10)
      .attr('y', (d) => yScaling(d.y1))
      .attr('height', (d) => yScaling(d.y0) - yScaling(d.y1))
      .transition()
      .attr('x', (d) => xScaling(d.group)!)
      .attr('width', xScaling.bandwidth());
  }

  function drawCaption() {
    const caption = plot
      .append('g')
      .attr(
        'transform',
        `translate(0,${svgConfig.innerHeight + svgConfig.margin.bottom})`
      );

    caption
      .selectAll('circle')
      .data(d3.range(seriesAmount))
      .enter()
      .append('circle')
      .attr('cx', (_, i) => i * 150)
      .attr('cy', 10)
      .attr('r', 10)
      .attr('fill', (d) => color(String(d)) as string);

    caption
      .selectAll('.bar-label')
      .data(d3.range(seriesAmount))
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .text((d) => 'Quartal ' + (d + 1))
      .attr('x', (_, i) => i * 150 + 45)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black');
  }

  function changeMode(mode: 'grouped' | 'stacked') {
    currentMode.value = mode;
    if (mode === 'grouped') transitionGrouped();
    else transitionStacked();
  }

  return { changeMode };
}

const changeModeRef = ref<(mode: 'grouped' | 'stacked') => void>();

onMounted(async () => {
  const { changeMode } = await drawChart();
  changeMode('stacked');
  changeModeRef.value = changeMode;
});
</script>

<style scoped>
form {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: absolute;
  left: 10px;
  top: 10px;
}
label {
  display: block;
}
</style>
