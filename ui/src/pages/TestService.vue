<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Test Service" />
      </q-breadcrumbs>
    </div>
    <PanelSection title="Test Service">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="title" label="Title" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />
        <q-input filled v-model="appName" label="App Name" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />
        <q-input filled v-model="serviceName" label="Service Name" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />
        <q-btn type="submit" label="submit" unelevated color="primary"></q-btn>
      </q-form>
    </PanelSection>
    <PanelSection title="Import Test Service">
      <CodeEditor :languages="[['json']]" v-model="input" theme="a11y-light" font-size="12px" :line-nums="true" style="width: 100%;">
      </CodeEditor>
      <br/>
      <div class="q-gutter-md">
<q-btn type="format" label="format" unelevated color="primary" @click="formatJson"></q-btn>
       <q-btn type="import" label="import" unelevated color="primary" @click="importTest"></q-btn>
      </div>

    </PanelSection>


    <div class="p-ma-md">&nbsp;</div>
    <q-table :columns="columns" :rows="rows" flat="" bordered="">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" flat color="primary" :to="'/runService/' + props.row.id"
            @click="editTestService(props.row.id)"></q-btn>
          <q-btn icon="delete" flat color="primary" @click="deleteTestService(props.row.id)"></q-btn>

        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>

import PanelSection from 'src/components/PanelSection.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar'
import CodeEditor from "simple-code-editor";
const title = ref("")

const appName = ref("")
const serviceName = ref("")
const input = ref(`
  [ {
      "title": "Test case 1",
      "appName": "App acronym",
      "serviceName": "Service name",
      "input": "{json}"
      } ]
  `)

const bar = ref(null)
const $q = useQuasar();
const columns = [
  { align: 'left', name: 'title', label: 'Title', field: 'title', sortable: true },
  { align: 'left', name: 'appName', label: 'App Name', field: 'appName', sortable: true },
  { align: 'left', name: 'serviceName', label: 'Service Name', field: 'serviceName', sortable: true },
  { align: 'left', name: 'ID', label: 'ID', field: 'id' },
  { align: 'left', name: 'actions', label: 'Action' }
]
const rows = ref([
])
onMounted(() => { syncApps(); })
const syncApps = () => {
  bar.value.start()
  axios({
    method: "GET",
    url: "/api/tests"
  }).then(data => {
    rows.value = data.data;
  }).catch(e => {
    $q.notify("Error fetching accounts");
    console.error(e);
  }).finally(() => {
    bar.value.stop()
  })
}
const formatJson = () => {
  try {
    var json = JSON.parse(input.value);
    input.value = JSON.stringify(json, null, 2);
  } catch (e) {
    console.error(e);
    $q.notify("Invalid JSON");
    return;
  }
}
const importTest = () => {

  try {
    var json = JSON.parse(input.value);
    if (!json.length) {
      json = [json];
    }
    bar.value.start();
    for (var i = 0; i < json.length; i++) {
      const item = json[i];
      axios({
        "method": "PUT",
        "url": "/api/tests",
        data: item
      }).then((data) => {
        console.log(data);
      }).catch(e => {
        $q.notify("Error saving test service " + item.title);
        console.error(e);
      })
      syncApps();
      bar.value.stop();
    }

  } catch (e) {
    console.error(e);
    $q.notify("Invalid JSON");
    bar.value.stop();
    return;
  }

}
const onSubmit = () => {
  bar.value.start()
  axios({
    "method": "PUT",
    "url": "/api/tests",
    data: {
      title: title.value,
      appName: appName.value,
      serviceName: serviceName.value,
      input: "{}"
    }
  }).then((data) => {
    console.log(data);
  }).catch(e => {
    $q.notify("Error saving test service");

    console.error(e);
  }).finally(() => {
    bar.value.stop();
    syncApps();
  })
}
const deleteTestService = (id) => {
  bar.value.start()
  axios({
    method: "DELETE",
    url: `/api/tests/${id}`,
  }).then(() => {

  }).catch((e) => {
    $q.notify("Error deleting test service");
    console.error(e);
  }).finally(() => {
    bar.value.stop();
    syncApps();
  })
}
const editTestService = (id) => { console.log("edit ", id); }
const onReset = () => { }



</script>
