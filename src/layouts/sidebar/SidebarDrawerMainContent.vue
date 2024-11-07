<template>
  <q-list>
    <q-expansion-item
      v-for="week in weeklyExercises"
      :key="week.week"
      class="text-weight-medium"
      group="exercises"
      :label="week.label"
      :caption="'Week ' + week.week"
    >
      <q-list class="text-weight-regular custom-list">
        <q-item
          v-for="exercise in week.exercises"
          :key="exercise.id"
          tag="router-link"
          :to="`/week${week.week}/${exercise.path}`"
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
import type { WeeklyExercises } from 'src/components/models';

const weeklyExercises = ref<WeeklyExercises[]>([
  {
    week: '1',
    label: 'Introduction',
    exercises: [
      {
        id: 1,
        label: 'Exercise 1',
        path: 'exercise1',
        caption: 'Exercise 1',
      },
      {
        id: 2,
        label: 'Exercise 2',
        path: 'exercise2',
        caption: 'Exercise 2',
      },
      {
        id: 3,
        label: 'Exercise 3',
        path: 'exercise3',
        caption: 'Exercise 3',
      },
      {
        id: 4,
        label: 'Exercise 4',
        path: 'exercise4',
        caption: 'Exercise 4',
      },
      {
        id: 5,
        label: 'Exercise 5',
        path: 'exercise5',
        caption: 'Exercise 5',
      },
      {
        id: 6,
        label: 'Exercise 6',
        path: 'exercise6',
        caption: 'Exercise 6',
      },
      {
        id: 7,
        label: 'Exercise 7',
        path: 'exercise7',
        caption: 'Exercise 7',
      },
      {
        id: 8,
        label: 'Exercise 8',
        path: 'exercise8',
        caption: 'Exercise 8',
      },
      {
        id: 9,
        label: 'Exercise 9',
        path: 'exercise9',
        caption: 'Exercise 9',
      },
      {
        id: -1,
        label: 'Exercise -1',
        path: 'exercise-1',
        caption: 'Exercise -1',
      },
    ],
  },
  {
    week: '2',
    label: 'Introduction Part 2',
    exercises: [
      {
        id: 21,
        label: 'Exercise 1',
        path: 'exercise1',
        caption: 'Exercise 1',
      },
      {
        id: 22,
        label: 'Exercise 2',
        path: 'exercise2',
        caption: 'Exercise 2',
      },
      {
        id: 23,
        label: 'Exercise 3',
        path: 'exercise3',
        caption: 'Exercise 3',
      },
    ],
  },
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
