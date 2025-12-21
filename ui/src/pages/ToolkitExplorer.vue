<script setup>

import axios from 'axios';
import PanelSection from 'src/components/PanelSection.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar();
const options = ref([])
const env = ref(null)
const bar = ref(null)
const apps = ref([]);

const snapshots = ref([]);

const appColumns = [
  { align: "left", name: 'name', label: 'Name', field: 'name', sortable: true },
  { align: "left", name: 'ID', label: 'ID', field: 'ID', sortable: true },
  {
    align: "left", name: 'snapshotCount', label: 'Snapshot Count', field: (r) => {

      return r.installedSnapshots ? r.installedSnapshots.length : 0;
    }, sortable: true
  },
  { align: "left", name: 'branch', label: 'Branch', field: 'defaultVersion', sortable: true },
  { align: 'left', name: 'actions', label: 'Action' }

];
const snapshotColumns = [
  { align: "left", name: 'name', label: 'Name', field: 'name', sortable: true },
  { align: "left", name: 'ID', label: 'ID', field: 'ID', sortable: true },
  { align: "left", name: 'active', label: 'Active', field: 'active', sortable: true },
  { align: "left", name: 'branchName', label: 'Branch', field: 'branchName', sortable: true },

];

const loadEnvs = () => {
  bar.value.start();
  axios(
    {
      method: "GET",
      url: "/api/accounts"
    }
  ).then((data) => {
    options.value = data.data
  }).catch((e) => {
    $q.notify("Error loading envs")
    console.error(e);
  }).finally(() => {
    bar.value.stop();
  })
}
onMounted(() => {
  loadEnvs();
})

const getApps = () => {
  bar.value.start();
  axios({
    method: "POST",
    url: "/api/toolkits",
    data: env.value
  }).then((res) => {
    if (res.data.data.processAppsList) {
      apps.value = res.data.data.processAppsList;
      console.log(apps.value);
    }

  }).catch(e => {
    $q.notify("Error getting apps")
    console.error(e)
  }).finally(() => {
    bar.value.stop();
  })
}
const viewSnapshot = (ss) => {

  if (ss) {
    snapshots.value = ss;
    console.log(snapshots.value)
  }

}
</script>

<template>
  <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
  <q-page class="q-pa-md q-gutter-md">

    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Toolkit Explorer" />
      </q-breadcrumbs>
    </div>
    <PanelSection title="Toolkit Explorer">
      <div class="q-gutter-md">
        <q-select filled v-model="env" :options="options" label="Enviroment" option-label="title" />
        <q-btn color="primary" unelevated @click="getApps">Get Toolkits</q-btn>
      </div>
    </PanelSection>
    <PanelSection title="Toolkits">
      <q-table flat="" bordered="" :columns="appColumns" :rows="apps">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="search" flat color="primary" @click="viewSnapshot(props.row.installedSnapshots)"></q-btn>

          </q-td>
        </template>
      </q-table>
    </PanelSection>
    <PanelSection title="Snapshots">
      <q-table flat="" bordered="" :columns="snapshotColumns" :rows="snapshots"></q-table>
    </PanelSection>
  </q-page>

</template>
