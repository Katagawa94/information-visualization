<template>
  <q-page class="column items-center">
    <q-card
      class="column items-center q-ma-md q-px-xl q-pb-xl content-container"
    >
      <slot />
    </q-card>
  </q-page>
</template>

<style scoped>
.content-container {
  min-width: 800px;
}
</style>
