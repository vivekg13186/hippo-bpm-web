<template>
  <q-page style="background-color: white;" class="full-width q-pa-md">
    <div>
      Process App : {{ about1.appName }} ({{ about1.shortName }})
    </div>
    <div>Snapshot : {{ about1.snapshotName }}</div>
    <br />

    <!-- Tree View -->
    <div>
      <div class="text-h6">Toolkits</div>
      <q-tree
        :nodes="treeData"
        node-key="snapshotId"
        label-key="projectName"
        children-key="projDeps"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <q-icon name="construction" />
            &nbsp;
            <div class="text-weight-bold">
              {{ prop.node.projectName }} ({{ prop.node.snapshotName }})
            </div>
          </div>
        </template>
      </q-tree>
    </div>

    <!-- Differences Table -->
    <div class="q-mt-md">
      <h6>Toolkit version mismatch</h6>

      <q-table
        :columns="columns"
        :rows="diffTree"
        :filter="filter"
      >
        <template v-slot:top>
          <q-space />
          <q-input
            borderless
            dense
            placeholder="Search"
            debounce="300"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref ,watch} from 'vue';
import { getAllNodesWithUsagePath } from './snapshot_diff';

// Props
const props = defineProps(['about', 'info']);

const about1 = ref(props.about);

// Reactive data
const data = ref(props.info);

// Filter for table search
const filter = ref('');

// Table columns
const columns = [
  { name: 'projectName', field: 'projectName', label: 'Project', sortable: true, align: 'left' },
  { name: 'snapshotName', field: 'snapshotName', label: 'Snapshot', sortable: true, align: 'left' },
  { name: 'usagePath', field: 'usagePath', label: 'Parent', sortable: true, align: 'left' }
];

 // Tree data
const treeData = ref([]);

// Flattened differences
const diffTree = ref([]);


function updateData() {
  treeData.value = [
    {
      projectName: about1.value.appName,
      snapshotName: about1.value.snapshotName,
      snapshotId: '0',
      projDeps: data.value.projDeps
    }
  ];

  diffTree.value = getAllNodesWithUsagePath([
    {
      projectName: about1.value.appName,
      snapshotName: about1.value.snapshotName,
      snapshotId: '0',
      projDeps: data.value.projDeps
    }
  ]);
}

watch(
  () => [props.info, props.about],
  ([newInfo, about]) => {
    data.value = newInfo;
    about1.value=about;
    updateData();
  },
  { deep: true } // deep watch in case info has nested changes
);
updateData();
</script>
