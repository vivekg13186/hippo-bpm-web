<template>
  <q-expansion-item :default-opened="true" :label="props.title" :hide-expand-icon="true"
    class="bg-primary text-white bordered">
    <div class="bg-white text-black q-pa-md" style="border:1px solid #ccc">
      <slot></slot>
    </div>

  </q-expansion-item>
</template>
<script setup>
const props = defineProps(["title"])
</script>
