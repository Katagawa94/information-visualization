<template>
  <ExerciseContainer>
    <h3>Wahlergebnis Landtagswahl:Hessen 2023</h3>
    <q-spinner-audio v-if="loading" color="primary" size="10em" />
    <div class="row q-pt-md">
      <div class="column items-center" v-if="selectedWahlkreisRef">
        <WahlkreisErgebnisBarChart :partyResults="chartParties" />
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
import { ref, onMounted, computed } from 'vue';
import ExerciseContainer from 'src/components/ExerciseContainer.vue';

import WahlkreisChart from 'src/components/WahlkreisChart.vue';
import {
  ElectionData,
  ElectionDistrictData,
  PartyResult,
} from 'src/models/wahlergebnis';
import WahlkreisErgebnisBarChart from 'src/components/WahlkreisErgebnisBarChart.vue';
import { loadWahlergebnisJSON } from 'src/scripts/jsonParser/wahlergebnisJsonParser';
import { parties } from 'src/models/partyColors';

const wahlergebnisRef = ref<ElectionData | undefined>(undefined);
const selectedWahlkreisRef = ref<ElectionDistrictData | undefined>(undefined);
const loading = ref(true);
function updateSelectedWahlkreis(selected: ElectionDistrictData | undefined) {
  selectedWahlkreisRef.value = selected;
}

const chartParties = computed(() => buildChartParties());

function buildChartParties() {
  if (!selectedWahlkreisRef.value) {
    return [];
  }

  const chartParties = [] as PartyResult[];
  parties.forEach((party) => {
    const partyResult = selectedWahlkreisRef.value!.partyResults.find((d) =>
      d.party.includes(party)
    );
    if (partyResult) {
      chartParties.push(partyResult);
    }
  });

  const sonstige = {} as PartyResult;
  sonstige.party = 'Sonstige';
  const votesPercent = chartParties.reduce((acc, d) => acc + d.votesPercent, 0);
  sonstige.votesPercent = 100 - votesPercent;

  chartParties.push(sonstige);

  return chartParties;
}

onMounted(async () => {
  const data = await loadWahlergebnisJSON();
  wahlergebnisRef.value = data;
  selectedWahlkreisRef.value = data.electionDistrictResults[0];
  loading.value = false;
});
</script>

<style scoped></style>
