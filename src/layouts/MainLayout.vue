<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title shrink>
          Information Visualization Wintersemester 2024/25
          <q-avatar rounded size="48px">
            <img :src="`${basePath}icons/logo-weiß.png`" />
          </q-avatar>
        </q-toolbar-title>

        <div>Kevin Emunds @ HSRM</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="text-h6 q-py-sm q-pl-md">Exercises</div>
      <q-separator />
      <SidebarDrawerMainContent />
    </q-drawer>
    <q-scroll-area
      style="height: 100vh; max-width: 100vw"
      :bar-style="{ width: '0px' }"
    >
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-scroll-area>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarDrawerMainContent from 'layouts/sidebar/SidebarDrawerMainContent.vue';

const basePath = import.meta.env.BASE_URL;

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
