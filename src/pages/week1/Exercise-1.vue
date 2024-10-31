<template>
  <ExerciseContainer>
    <h2>Look at this Graph</h2>
    <img :src="`${basePath}pictures/meme.png`" />
  </ExerciseContainer>
</template>

<script setup lang="ts">
import ExerciseContainer from 'src/components/ExerciseContainer.vue';

const basePath = import.meta.env.BASE_URL;
</script>

<style scoped></style>
