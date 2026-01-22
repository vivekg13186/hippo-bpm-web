<template>
  <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
  <q-page class="q-pa-md q-gutter-md">
    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Test service" to="/testService" />
        <q-breadcrumbs-el label="Run service" />
      </q-breadcrumbs>
    </div>
    <PanelSection title="Run Service">
      <div class="q-gutter-md">
        <q-select filled v-model="env" :options="options" label="Enviroment" option-label="title" />
        <q-input filled label="App Name" v-model="appName"></q-input>
        <q-input filled label="Service Name" v-model="serviceName"></q-input>
        <q-btn color="primary" unelevated @click="runService">Run</q-btn>
        <q-btn color="primary" unelevated @click="saveService">Save</q-btn>
      </div>
    </PanelSection>
    <PanelSection title="Input JSON">
      <CodeEditor :languages="[['json']]" v-model="input" theme="a11y-light" font-size="12px" :line-nums="true" style="width: 100%;">
      </CodeEditor>
    </PanelSection>
    <PanelSection title="Output JSON">
      <CodeEditor :languages="[['json']]" v-model="output" theme="a11y-light" font-size="12px" :line-nums="true" style="width: 100%;">
      </CodeEditor>
    </PanelSection>
  </q-page>

</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
import CodeEditor from "simple-code-editor";
import PanelSection from "src/components/PanelSection.vue";
import axios from 'axios';
import { useQuasar } from 'quasar'

const $q = useQuasar();
const options = ref([])
const bar = ref(null)
const env = ref(null)
const appName = ref("")
const serviceName = ref("")
const title = ref("")
const input = ref("")
const output = ref("")
const id = ref($route.params.id);
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
const loadTestService = (id) => {
  bar.value.start();
  axios(
    {
      method: "GET",
      url: "/api/tests/" + id
    }
  ).then((data) => {
    const testService = data.data;
    title.value = testService.title;
    appName.value = testService.appName;
    serviceName.value = testService.serviceName;
    input.value = testService.input
  }).catch((e) => {
    $q.notify("Error loading test service")
    console.error(e);
  }).finally(() => {
    bar.value.stop();
  })
}
onMounted(() => {
  loadEnvs();
  loadTestService($route.params.id);
})
const runService = () => {
  bar.value.start();
  axios({
    method: "POST",
    url: "/api/executeService",
    data: {
      account: env.value,
      testService: {
        id: id.value,
        title: title.value,
        appName: appName.value,
        serviceName: serviceName.value,
        input: input.value
      }
    }
  }
  ).then((data) => {
    console.log(data);
    output.value = JSON.stringify(data.data, null, 2);
  }).catch(e => {
    $q.notify("Error running service");
    console.error(e);
    output.value = String(e);
  }).finally(() => {
    bar.value.stop();
  })
}
const saveService = () => {
  bar.value.start();
  axios({
    method: "PUT",
    url: "/api/tests",
    data: {
      id: id.value,
      title: title.value,
      appName: appName.value,
      serviceName: serviceName.value,
      input: input.value
    }
  }).then((data) => {
    $q.notify("Test service saved successfully");
    console.log(data);
  }).catch(e => {
    $q.notify("Error saving test service");
    console.error(e);
  }).finally(() => {
    bar.value.stop();
  })
}
</script>
