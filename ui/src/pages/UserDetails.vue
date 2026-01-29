<template>
  <q-ajax-bar ref="bar" position="top" size="10px" skip-hijack />
  <q-page class="q-pa-md q-gutter-md">

    <div class="q-pb-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="User Details" />
      </q-breadcrumbs>
    </div>


    <div class="q-gutter-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-select filled v-model="env" :options="options" label="Enviroment" option-label="title" />
        <q-input filled v-model="userName" label="Username" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please enter user login name']" />
        <q-btn type="submit" label="submit" unelevated color="primary"></q-btn>
      </q-form>

    </div>





    <PanelSection title="Memberships">
      <div>

        <q-input filled v-model="membershipFilter" label="Filter memberships" debounce="300" clearable />
        <q-list bordered separator>
          <q-item v-for="value in filteredMemberships" :key="value">
            <q-item-section>{{ value }}</q-item-section>
          </q-item>

          <q-item v-if="filteredMemberships.length === 0">
            <q-item-section class="text-grey">
              No memberships found
            </q-item-section>
          </q-item>
        </q-list>

      </div>
    </PanelSection>


  </q-page>
</template>

<script setup>
import PanelSection from 'src/components/PanelSection.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar'

const userName = ref("")

const env = ref(null)
const options = ref([])

const bar = ref(null)
const $q = useQuasar();

const memberships = ref([])



const onSubmit = () => {
  if (!env.value) {
    $q.notify("Select a env");
    return;
  }
  bar.value.start()
  axios({
    "method": "POST",
    "url": "/api/getUserInfo",
    data: {
      account: env.value,
      userName: userName.value,
    }
  }).then((res) => {
    memberships.value = res.data.data.memberships
  }).catch(e => {
    $q.notify("Error fetching user details");
    console.error(e);
  }).finally(() => {
    bar.value.stop();
  })
}

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

const membershipFilter = ref('')

const filteredMemberships = computed(() => {
  if (!membershipFilter.value) {
    return memberships.value
  }

  const filter = membershipFilter.value.toLowerCase()

  return memberships.value.filter(m =>
    m.toLowerCase().includes(filter)
  )
})

</script>
