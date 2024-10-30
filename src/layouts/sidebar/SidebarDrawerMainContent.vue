<template>
  <q-list>
    <q-expansion-item
      class="text-weight-medium"
      group="exercises"
      label="Introduction"
      caption="Week 1"
      default-opened
    >
      <q-list class="text-weight-regular custom-list">
        <q-item
          v-for="exercise in exercises"
          :key="exercise.id"
          tag="router-link"
          :to="`/week1/${exercise.path}`"
          clickable
          v-ripple
          active-class="custom-active-class"
        >
          <q-item-section>
            <q-item-label>{{ exercise.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <q-separator />
  </q-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const exercises = ref([
  { id: 1, label: 'Exercise 1', path: 'exercise1', caption: 'Exercise 1' },
  { id: 2, label: 'Exercise 2', path: 'exercise2', caption: 'Exercise 2' },
  { id: 3, label: 'Exercise 3', path: 'exercise3', caption: 'Exercise 3' },
  { id: 4, label: 'Exercise 4', path: 'exercise4', caption: 'Exercise 4' },
  { id: 5, label: 'Exercise 5', path: 'exercise5', caption: 'Exercise 5' },
  { id: 6, label: 'Exercise 6', path: 'exercise6', caption: 'Exercise 6' },
]);
</script>

<style scoped>
.custom-list .q-item {
  background-color: #f8f8f8;
}

.custom-active-class {
  background-color: #dcdcdc !important;
}
</style>
