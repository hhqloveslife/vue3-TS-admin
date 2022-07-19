<template>
  <div class="overview">
    <div class="content">
      <div v-for="item in show" :key="item">
        <div v-html="item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import { message } from './config.ts'

const show = computed(() => {
  return message.split('\n').map((v: string) => {
    return marked(v)
  })
})
</script>

<style scoped></style>
