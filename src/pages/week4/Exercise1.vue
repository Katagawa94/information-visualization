<template>
  <ExerciseContainer>
    <h3>Wahlergebnis Landestagswahl:Hessen 2023</h3>
    <q-spinner-audio v-if="loading" color="primary" size="10em" />
    <div class="row q-pt-md">
      <div class="column items-center" v-if="selectedWahlkreisRef">
        <WahlkreisErgebnisBarChart :wahlkreis="selectedWahlkreisRef" />
        <span
          >Wahlgebiet: {{ selectedWahlkreisRef.electionDistrict.name }}</span
        >
      </div>
      <WahlkreisChart
        :wahlergebnis="wahlergebnisRef"
        :selectedWahlkreis="selectedWahlkreisRef"
        @update:selectedWahlkreis="updateSelectedWahlkreis"
        v-if="wahlergebnisRef"
      />
    </div>
  </ExerciseContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';

import WahlkreisChart from 'src/components/WahlkreisChart.vue';
import { ElectionData, ElectionDistrictData } from 'src/models/wahlergebnis';
import WahlkreisErgebnisBarChart from 'src/components/WahlkreisErgebnisBarChart.vue';
import { loadWahlergebnisJSON } from 'src/scripts/jsonParser/wahlergebnisJsonParser';

const wahlergebnisRef = ref<ElectionData | undefined>(undefined);
const selectedWahlkreisRef = ref<ElectionDistrictData | undefined>(undefined);
const loading = ref(true);
function updateSelectedWahlkreis(selected: ElectionDistrictData | undefined) {
  selectedWahlkreisRef.value = selected;
}

onMounted(async () => {
  const data = await loadWahlergebnisJSON();
  wahlergebnisRef.value = data;
  selectedWahlkreisRef.value = data.electionDistrictResults[0];
  loading.value = false;
});
</script>

<style scoped></style>
