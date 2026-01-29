<template>
   <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
  <q-page class="q-pa-md q-gutter-md">

    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Account" />
      </q-breadcrumbs>
    </div>
    <PanelSection title="Account">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="title" label="Title" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />
        <q-input filled v-model="url" label="Url" type="url" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />
        <q-input filled v-model="username" label="Username" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />
        <div class="q-gutter-sm">
          <q-radio v-model="authType" val="basic" label="Basic Auth" />
          <q-radio v-model="authType" val="zen" label="Zen API Key" />
        </div>
        <q-input filled v-model="password" type="password" label="Password" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" v-if="authType == 'basic'" />
        <q-input filled v-model="apiKey" label="Zen API Key" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" v-if="authType == 'zen'" />
        <q-btn type="submit" label="submit" unelevated color="primary"></q-btn>
      </q-form>
    </PanelSection>

    <div class="p-ma-md">&nbsp;</div>
    <q-table :columns="columns" :rows="rows" flat="" bordered="">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" flat color="primary" @click="deleteAccount(props.row.id)"></q-btn>

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

const $q = useQuasar();
const columns = [
  { align: 'left', name: 'title', label: 'Title', field: 'title', sortable: true },
  { align: 'left', name: 'url', label: 'URL', field: 'url', sortable: true },
  { align: 'left', name: 'username', label: 'Username', field: 'username', sortable: true },
  { align: 'left', name: 'type', label: 'Auth Type', field: 'type' },
  { align: 'left', name: 'actions', label: 'Action' }
]
const rows = ref([
  {
    id: "_default_1", title: "test1", url: "http://www.google.com", username: "vivek", authType: "ZenAPI",

  }, {
    id: "asd:", title: "test1", url: "http://www.google.com", username: "vivek", authType: "Basic"
  }
])
onMounted(() => { syncApps(); })
const syncApps = () => {
  bar.value.start()
  axios({
    method: "GET",
    url: "/api/accounts"
  }).then(data => {
    rows.value = data.data;
  }).catch(e => {
    $q.notify("Error fetching accounts");
    console.error(e);
  }).finally(() => {
    bar.value.stop()
  })
}
const onSubmit = () => {
  bar.value.start()
  axios({
    "method": "PUT",
    "url": "/api/accounts",
    data: {
      title: title.value,
      url: url.value,
      username: username.value,
      password: authType.value == 'basic' ? password.value : apiKey.value,
      type: authType.value,
    }
  }).then((data) => {
    console.log(data);
  }).catch(e => {
    $q.notify("Error saving account");

    console.error(e);
  }).finally(() => {
    bar.value.stop();
    syncApps();
  })
}
const deleteAccount = (id) => {
  bar.value.start()
  axios({
    method: "DELETE",
    url: `/api/accounts/${id}`,
  }).then(() => {

  }).catch((e) => {
    $q.notify("Error deleting account");
    console.error(e);
  }).finally(() => {
    bar.value.stop();
    syncApps();
  })
}
const onReset = () => { }
const title = ref("")
const url = ref("")
const username = ref("")
const password = ref("")
const apiKey = ref("")
const authType = ref("basic")
const bar = ref(null)


</script>
