import { RouteRecordRaw } from 'vue-router';

const generateExerciseRoutes = (
  week: number,
  exercises: number[]
): RouteRecordRaw => ({
  path: `week${week}`,
  component: () => import('layouts/WeekNavigationLayout.vue'),
  children: exercises.map((exercise) => {
    const exercisePath = `exercise${exercise}`;
    const componentPath = `pages/week${week}/Exercise${exercise}.vue`;

    // Switch case, because vite does not like dynamic import statements. sadge.
    const component = () => {
      switch (componentPath) {
        case 'pages/week1/Exercise1.vue':
          return import('pages/week1/Exercise1.vue');
        case 'pages/week1/Exercise2.vue':
          return import('pages/week1/Exercise2.vue');
        case 'pages/week1/Exercise3.vue':
          return import('pages/week1/Exercise3.vue');
        case 'pages/week1/Exercise4.vue':
          return import('pages/week1/Exercise4.vue');
        case 'pages/week1/Exercise5.vue':
          return import('pages/week1/Exercise5.vue');
        case 'pages/week1/Exercise6.vue':
          return import('pages/week1/Exercise6.vue');
        case 'pages/week1/Exercise7.vue':
          return import('pages/week1/Exercise7.vue');
        case 'pages/week1/Exercise8.vue':
          return import('pages/week1/Exercise8.vue');
        case 'pages/week1/Exercise9.vue':
          return import('pages/week1/Exercise9.vue');
        case 'pages/week1/Exercise-1.vue':
          return import('pages/week1/Exercise-1.vue');
        case 'pages/week2/Exercise1.vue':
          return import('pages/week2/Exercise1.vue');
        case 'pages/week2/Exercise2.vue':
          return import('pages/week2/Exercise2.vue');
        case 'pages/week2/Exercise3.vue':
          return import('pages/week2/Exercise3.vue');
        default:
          throw new Error(`Component not found for path: ${componentPath}`);
      }
    };

    return {
      path: exercisePath,
      component,
    };
  }),
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      generateExerciseRoutes(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, -1]),
      generateExerciseRoutes(2, [1, 2, 3]),
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
