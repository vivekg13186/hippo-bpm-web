<script setup>

import axios from 'axios';
import PanelSection from './PanelSection.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar'
import SnapshotView from './SnapshotView.vue';
const props = defineProps(["title", "url"]);
const $q = useQuasar();
const options = ref([])
const env = ref(null)
const bar = ref(null)
const apps = ref([]);
const filter1 = ref('');
const filter2 = ref('');
const currentApp = ref({});


const snapshots = ref([]);
const currentSnapshot=ref({});
const currentSnapshotInfo=ref({});
const appColumns = [
  { align: "left", name: 'name', label: 'Name', field: 'name', sortable: true },
  { align: "left", name: 'shortName', label: 'Short', field: 'shortName', sortable: true },
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
  { align: 'left', name: 'actions', label: 'Action' }
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
    url: props.url,//"/api/apps",
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

  if (ss && ss.installedSnapshots) {
    currentApp.value = ss;
    snapshots.value = ss.installedSnapshots;
    console.log(snapshots.value)
  }

}
const showSSDetails = (row) => {
  console.log("showSSDetails")
  currentSnapshot.value=row;
  console.log(row);
  bar.value.start();
  axios({
    method: "POST",
    url:  "/api/snapshot",
    data: {
        account :env.value,
        snapshotId : row.ID
    }
  }).then((res) => {
      currentSnapshotInfo.value = res.data.data;
      console.log("currentSnapshotInfo",currentSnapshotInfo.value);
  }).catch(e => {
    $q.notify("Error getting apps")
    console.error(e)
  }).finally(() => {
    bar.value.stop();
  })
}
</script>

<template>
  <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
  <q-page class="q-pa-md q-gutter-md">

    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el :label="props.title" />
      </q-breadcrumbs>
    </div>
    <PanelSection :title="props.title">
      <div class="q-gutter-md">
        <q-select filled v-model="env" :options="options" label="Enviroment" option-label="title" />
        <q-btn color="primary" unelevated @click="getApps">Get Apps</q-btn>
      </div>
    </PanelSection>
    <PanelSection title="Applications">
      <q-table flat="" bordered="" :columns="appColumns" :rows="apps" :filter="filter1">
        <template v-slot:top>


          <q-input borderless dense placeholder="Search" debounce="300" color="primary" v-model="filter1">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="search" flat color="primary" @click="viewSnapshot(props.row)"></q-btn>

          </q-td>
        </template>
      </q-table>
    </PanelSection>
    <PanelSection title="Snapshots">
      <q-table flat="" bordered="" :columns="snapshotColumns" :rows="snapshots" :filter="filter2">
        <template v-slot:top>
          <div v-if="currentApp.name" class="text-subtitle1">{{ currentApp.name }}({{ currentApp.shortName }})
            <span v-if="currentApp.defaultVersion">({{ currentApp.defaultVersion }})</span>
          </div>
          <q-space />
          <q-input borderless dense placeholder="Search" debounce="300" color="primary" v-model="filter2">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-active="props">
          <q-td :props="props">
            <q-badge color="primary" outline v-if="props.row.active">
              Yes
            </q-badge>
            <q-badge color="warning" outline v-else>
              No
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="search" flat color="primary" @click="showSSDetails(props.row)">
            </q-btn>

          </q-td>

        </template>
      </q-table>
    </PanelSection>
    <PanelSection title="Snapshot Information" v-if="currentSnapshotInfo.projDefaults">
      <SnapshotView :about="{snapshotName :currentSnapshot.name,appName:currentApp.name ,shortName:currentApp.shortName}" :info="currentSnapshotInfo"></SnapshotView>
    </PanelSection>


  </q-page>

</template>
