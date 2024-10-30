<template>
  <ExerciseContainer><h2>Second Heading</h2></ExerciseContainer>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
import { onMounted } from 'vue';

onMounted(() => {
  const dataset = [1, 2, 3, 4, 5];

  d3.select('.q-card')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    // .text('D3 is awesome !!');
    .text((d: number) => 'Number ' + d);
});
</script>
