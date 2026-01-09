<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />


        <q-toolbar-title style="align-items: center;
    justify-content: center;
    display: flex;
    gap: 10px;">

          <img src="/hippo-light.png" style="height: 30px;width: 30px;">


          Hippo BPM</q-toolbar-title>

        <div>v 0.3</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item class="bg-primary text-white">
          <q-item-section avatar>
            <img src="/hippo-light.png" style="height: 30px;width: 30px;">
          </q-item-section>
          <q-item-section class="text-center">
            <b>Hippo BPM</b>
          </q-item-section>
        </q-item>
        <q-item clickable to="/accounts">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Accounts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/appExplorer">
          <q-item-section avatar>
            <q-icon name="apps" />
          </q-item-section>
          <q-item-section>
            <q-item-label>App explorer</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/toolkitExplorer">
          <q-item-section avatar>
            <q-icon name="construction" />
          </q-item-section>
          <q-item-section>
            Toolkit explorer
          </q-item-section>
        </q-item>

        <q-item clickable to="/instanceViewer">
          <q-item-section avatar>
            <q-icon name="workspaces" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Instance viewer</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/testService">
          <q-item-section avatar>
            <q-icon name="science" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Test Services</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
