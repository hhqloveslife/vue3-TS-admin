<template>
  <div class="mycard">
    <el-card shadow="always" :header="header">
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  header: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
