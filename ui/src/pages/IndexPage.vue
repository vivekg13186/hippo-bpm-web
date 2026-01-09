<template>
  <q-page class="flex flex-center q-pa-md">
    <div v-html="help" class="markdown-body"></div>

  </q-page>
</template>

<script setup>
import 'github-markdown-css/github-markdown-light.css'
import MarkdownIt from 'markdown-it'
import { onMounted, ref } from 'vue';
var help = ref(`

# Welcome to Hippo BPM DevTools!
V 0.3

### Hippo DevTools is your all-in-one solution for developing, testing, and managing IBM BAW applications with ease.

- Supports both IBM BAW traditional and Cloud Pak versions
- View all your snapshots and toolkit dependencies
- Explore toolkits, snapshots, and their dependency chains
- Execute test services effortlessly
- View instance details in a clean, readable format
- Manage and monitor multiple environments within a single app—no need to log in to multiple portals
- Compare results across environments directly within the app
- Get started by selecting an option from the main menu!


> If the REST API URL for your Cloud Pak environment ends with **/bas**, ensure this suffix is included in the URL fie




`);
onMounted(() => {
  const md = new MarkdownIt()
  help.value = md.render(help.value)
})
</script>
