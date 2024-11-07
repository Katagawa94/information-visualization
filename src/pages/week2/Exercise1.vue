<template>
  <ExerciseContainer>
    <h2>Verteces, Faces & Voxels</h2>
    <span> ... Derived with Mr. Weier </span>
    <div class="row">
      <div class="column items-center">
        <h3>Vertices</h3>
        <span> nx * ny * nz </span>
        <h3>Lines</h3>
        <span>((nx-1)*ny) + ((ny-1) * nx * nz) + nx * ny *(nz- 1)</span>
      </div>
      <div class="column items-center">
        <h3>Faces</h3>
        <span>
          (nx-1) * (ny-1) * nz + (nx-1) * (ny-1) * (nz-1) * 2 + (ny-1) * (nz-1)
          + (nz-1) * (nx-1)
        </span>
        <h3>Voxels</h3>
        <span> (nx-1) * (ny-1) * (nz-1)</span>
      </div>
    </div>
  </ExerciseContainer>
</template>

<script setup lang="ts">
import ExerciseContainer from 'src/components/ExerciseContainer.vue';
</script>

<style scoped>
span {
  font-family: Arial, sans-serif;
}
</style>
