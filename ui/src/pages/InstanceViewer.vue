<template>
  <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
  <q-page class="q-pa-md q-gutter-md">

    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Instance Viewer" />
      </q-breadcrumbs>
    </div>
    <PanelSection title="Application Explorer">
      <div class="q-gutter-md">
        <q-select filled v-model="env" :options="options" label="Enviroment" option-label="title" />
        <q-input filled label="Instance ID" v-model="instanceId"></q-input>
        <q-btn color="primary" unelevated @click="getInstance">Get Instance</q-btn>
      </div>
    </PanelSection>
    <PanelSection title="Instance Information">
      <div class="q-gutter-md">

        <q-markup-table flat="" bordered="">
          <tbody>
            <tr>
              <td class="hg">CreationTime</td>
              <td>{{ instanceData.creationTime }}</td>
              <td class="hg">ExecutionState</td>
              <td>{{ instanceData.executionState }}</td>
              <td class="hg">State </td>
              <td>{{ instanceData.state }}</td>
            </tr>
            <tr>
              <td class="hg">Last Modification Time</td>
              <td>{{ instanceData.lastModificationTime }}</td>
              <td class="hg">Name</td>
              <td>{{ instanceData.name }}</td>
              <td class="hg">Instance ID</td>
              <td>{{ instanceData.piid }}</td>
            </tr>
            <tr>
              <td class="hg">Process AppName</td>
              <td>{{ instanceData.processAppName }}</td>
              <td class="hg">Process AppAcronym</td>
              <td>{{ instanceData.processAppAcronym }}</td>
              <td class="hg">Process AppID</td>
              <td>{{ instanceData.processAppID }}</td>
            </tr>
            <tr>
              <td class="hg">SnapshotID</td>
              <td>{{ instanceData.snapshotID }}</td>
              <td class="hg">BranchID</td>
              <td>{{ instanceData.branchID }}</td>
              <td class="hg">Branch Name</td>
              <td>{{ instanceData.branchName }}</td>
            </tr>
            <tr>
              <td class="hg">Instance Error</td>
              <td>{{ instanceData.instanceError }}</td>
              <td class="hg">Predicted DueDate</td>
              <td>{{ instanceData.predictedDueDate }}</td>
              <td class="hg"></td>
              <td></td>
            </tr>
          </tbody>

        </q-markup-table>
        <q-table flat bordered="" :columns="taskColumns" :rows="tasks">

        </q-table>
      </div>


      <h6>Execution Tree</h6>
      <q-tree :nodes="treeData" node-key="label" />



    </PanelSection>

  </q-page>
</template>
<script setup>

import PanelSection from 'src/components/PanelSection.vue';
import { ref, onMounted } from 'vue';

import axios from 'axios';
import { useQuasar } from 'quasar'

const $q = useQuasar();

const options = ref([])
const env = ref(null)
const bar = ref(null)
const instanceId = ref("");
const instanceData = ref({});

const taskColumns = [
  { align: "left", name: 'taskName', label: 'Task', field: 'displayName', sortable: true },
  { align: "left", name: 'tkiid', label: 'ID', field: 'tkiid', sortable: true },
  { align: "left", name: 'state', label: 'State', field: 'state', sortable: true },
  { align: "left", name: 'lastModified', label: 'Last Modified', field: 'lastModificationTime', sortable: true },
  { align: "left", name: ' completionTime', label: 'Completion Time', field: 'completionTime', sortable: true },
  { align: "left", name: ' startTime', label: 'Start Time', field: 'startTime', sortable: true },
  { align: "left", name: 'assignedTo', label: 'Assigned To', field: 'assignedToDisplayName', sortable: true },
  { align: "left", name: 'closedBy', label: 'Closed By', field: 'closeByUser', sortable: true },

];

const treeData = ref([]);
const syncTree = () => {
  var et = instanceData.value.executionTree;
  if (et && et.root) {
    treeData.value = [nodeTree(et.root)];
  }
}
const nodeTree = (n) => {
  var children = n.children ? n.children.map(nodeTree) : []
  return {
    label: n.tokenId ? `${n.name}(tkn:${n.tokenId})` : n.name,
    children
  }
}
const getInstance = () => {
  bar.value.start();
  instanceData.value = {};
  tasks.value = [];
  axios(
    {
      method: "POST",
      url: "/api/instance/" + instanceId.value,
      data: env.value
    }
  ).then((res) => {
    instanceData.value = res.data.data
    console.log(instanceData.value)
    tasks.value = res.data.data.tasks
    syncTree();
  }).catch((e) => {
    $q.notify("Error loading instance")
    console.error(e);
  }).finally(() => {
    bar.value.stop();
  })
}
const tasks = ref([]);

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
</script>
<style scoped>
.hg {
  background-color: #f1f1f1;
}
</style>
