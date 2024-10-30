<template>
  <ExerciseContainer>
    <h2 id="heading">First heading</h2>
  </ExerciseContainer>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onMounted } from 'vue';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';

onMounted(() => {
  d3.select('h2')
    .style('color', 'red')
    .attr('class', 'heading')
    .text('Updated h1 tag');

  d3.select('.q-card').append('p').text('First paragraph');
  d3.select('.q-card').append('p').text('Second paragraph');
  d3.select('.q-card').append('p').text('Third paragraph');
});
</script>
