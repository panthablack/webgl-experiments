<template>
  <canvas
    id="glcanvas"
    width="640"
    height="480"
  ></canvas>
</template>

<script setup lang="ts">
import { launchEmptyWebGL } from '@/utilities/webgl/empty'
import { onMounted } from 'vue'

onMounted(() => {
  launchEmptyWebGL()
})
</script>